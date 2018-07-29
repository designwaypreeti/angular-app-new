import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from '../../../node_modules/ngx-bootstrap';
import { PaymentsDialogComponent } from '../payemnts/payments-dialog/payments-dialog.component';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.less']
})
export class TicketBookingComponent implements OnInit {
  bsModalref: BsModalRef;
  @Input() eId 
  @Input() venue 
  tickets
  activeTicket={
    ticket:{}
  }
  subTotal=0
  fees=0
  user
  purchase=[]
  state = 1
  price = 0;
  cards = [];
  quantity=[0,1,2,3,4,5,6,7,8,9,10]
  constructor(private mainService: MainService, private toastr: ToastrService, 
    private modalService: BsModalService) {
    this.user = JSON.parse(localStorage.getItem('user'))
   }

  ngOnInit() {
    console.log(this.venue)
    this.fetchTickets()
    
  }


  fetchTickets(){
    this.mainService.getTicket(this.eId).subscribe(r=>{
      console.log(r)
      this.tickets = r.tickets
      this.tickets.map(e=>{
        e.selectedQuantity=0;
        return e
      })
      if(this.tickets) this.activeTicket.ticket = this.tickets[0]
    },e=>{

    })
  }
  prePurchase(){
    this.purchase = this.tickets.filter(e=> e.selectedQuantity)
    this.subTotal = 0
    this.tickets.forEach(e => { 
      this.subTotal = (parseInt(e.selectedQuantity) * parseInt(e.ticket_price))  + this.subTotal
    });
    console.log(this.subTotal)
  }
  thePurchase(){
    // lol
    console.log('total:'+ this.subTotal +'\n')
    console.log('tickets:'+ this.purchase +'\n')
    const readyTickets = this.purchase.map(e=>{
      const obj ={
        ticketid:e._id,
        quantity:e.selectedQuantity,
        amount:e.ticket_price
      }
      return obj
    })
    this.mainService.bookTicket(this.user._id,this.eId,readyTickets,this.subTotal)
    .subscribe(
      r=>{
        this.toastr.success('Ticket Booked', '', {
          timeOut: 3000,
        })
          console.log(r)
      }
      ,e=>{})

  }
  buyTickets(price){
    this.getCards();
    const initialState = { price: price, subscription: true }
    this.bsModalref = this.modalService.show(PaymentsDialogComponent, Object.assign({}, { initialState }));
  }
  getCards(){
    this.mainService.getCardList(this.user._id).subscribe(res=>{
      this.cards = res.result.data;
    })
  }
}
