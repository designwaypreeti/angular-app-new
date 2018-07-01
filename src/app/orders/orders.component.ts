import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { FilterPipe } from "../shared/pipes/filter.pipe";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  orders
  uId
  user
  selectedBooking
  hi:boolean=true;
  bookings:any;
  bsModalRef: BsModalRef;
  bookUser:any= [];
  filterText: any = '';
  filterText2:any='';
  ticktType: any = ['All','General', 'VIP']

  constructor(private mainService: MainService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }


  openModalWithComponent(booking) {
    const initialState = {
      bookings:booking
    };
    this.bsModalRef = this.modalService.show(OrderDialogComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  selectBooking(booking){
    this.selectedBooking=booking; 
  }
  ngAfterViewChecked(){
    console.log(this.filterText)
  }
 
  ngOnInit() {
    this.mainService.getOrders(this.user._id).subscribe(r => {
      this.bookings = r.bookings;
      this.dateFormat(this.bookings)
      this.addUser(this.bookings)
      this.getTicketType(this.bookings)
    }, e => {
    })
  }

  dateFormat(bookings){
    for(let i = 0 ; i < bookings.length;i++){
      let date = bookings[i].bookingInfo.bookingdate.split(" ");
      this.bookings[i].bookingInfo.date= date[0]
    }
  }
  addUser(bookings){
    for (let i = 0; i < bookings.length; i++) {
     let userId = bookings[i].bookingInfo.bookedby;
     this.mainService.getProfile(userId)
     .subscribe(res=>{
       let user = res.user.name;
       this.bookings[i].bookingInfo.user = user;
    
     })
    }

  }
  getTicketType(bookings){
    for (let i = 0; i < bookings.length; i++) {
      let ticketId = bookings[i].bookingInfo.tickets[0].ticketid;
      this.mainService.getTicketInfo(ticketId)
      .subscribe(res=>{
      if(res.tickets[0]){
        let t_type = res.tickets[0].ticket_type;
        let t_price = res.tickets[0].ticket_price;
        this.bookings[i].bookingInfo.ticket_type = t_type;
        this.bookings[i].bookingInfo.ticket_price = t_price;
      }
      })
    }    
  }

}
