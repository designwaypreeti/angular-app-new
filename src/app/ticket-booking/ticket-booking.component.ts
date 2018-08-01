import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from '../../../node_modules/ngx-bootstrap';
import { PaymentsDialogComponent } from '../payemnts/payments-dialog/payments-dialog.component';
import { MatDialog } from '../../../node_modules/@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';

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
  totalFees = 0;
  quantity=[0,1,2,3,4,5,6,7,8,9,10]
  processingPayment:boolean = false;
  cardOptions = [
    {
      value: 'delete',
      viewValue: 'Delete'
    },
  ];
selectedTickets = [];
  question: any = 'Do you want to proceed with the payment?';
  answer: boolean = false;
  constructor(private mainService: MainService, private toastr: ToastrService, 
    private modalService: BsModalService, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'))
   }

  ngOnInit() {
    console.log(this.venue)
    this.fetchTickets()
    this.getCards();
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
  prePurchase(tick, m){
    let ticketData = {
      ticketid : tick._id,
      quantity: m
    }
    this.selectedTickets.push(ticketData);

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
  saveTotal(total){
    this.totalFees = total;
  }
  buyTickets(price){
   
    const initialState = { price: price, subscription: true }
    this.bsModalref = this.modalService.show(PaymentsDialogComponent, Object.assign({}, { initialState }));
  }
  getCards(){
    this.mainService.getCardList(this.user._id).subscribe(res=>{
      this.cards = res.result.data;
    })
  }

  makeSavedPayment(card){
   
    let data = {
      total: this.totalFees,
      card_id: card.id,
      tickets: this.selectedTickets
    }
    console.log(data)
    this.mainService.makeSavedCardPayment(this.user._id,data, this.eId)
    .subscribe();
  }

  makeStripePayment(){
    this.processingPayment = true;
    this.checkOut(this.price, (token: any) => this.takePayment(this.totalFees, token));
  }



  checkOut(amount, tokenCallback) {
    let self = this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TNsGjHbknrwF5dfXVhwKzRjt',
      locale: 'auto',
      token: tokenCallback
    });
    amount *= 100;
    handler.open({
      name: 'Stubba',
      zipCode: false,
      currency: 'usd',
      amount: amount,
      allowRememberMe: false
    })
    setTimeout(() => {
      this.processingPayment= false;
    }, 7000);
  }
  takePayment(amount: number, token: any) {
    let body = {
      email: "preeti.19@gmail.com",
      source_token: token.id,
      amount: amount,
      currency: "USD",
      activity: "Subscription Plan renewal"
    };
    let user = localStorage.getItem('user');
    let uId = JSON.parse(user)._id;
    let data = {
      tickets: this.selectedTickets,
      total: this.totalFees,
      source_token: token.id
    }
    this.mainService.makeSavedCardPayment(this.user._id, data, this.eId)
      .subscribe(()=>{
       
      //  this.addCard(cardbody)
      });

  }
  addCard(data){
    this.mainService.addcard(this.user._id, data).subscribe();
  }
  popWarning(card){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: { ques: this.question, ans: this.answer }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.answer = result;
      if (result) {
        this.makeSavedPayment(card)
      }
      console.log(this.answer);
    });
  }
}
