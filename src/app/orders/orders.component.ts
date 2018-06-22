import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

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
 
  ngOnInit() {
    this.mainService.getOrders(this.user._id).subscribe(r => {
      this.bookings = r.bookings;
      this.dateFormat(this.bookings)
      this.addUser(this.bookings)
    }, e => {
      console.log(e)
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

}
