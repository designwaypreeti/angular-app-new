import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TabsetComponent } from "ngx-bootstrap";
import { MainService } from '../../shared/services/main.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.less']
})
export class OrderDialogComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  bookedBy:any;
  title: string;
  closeBtnName: string;
  bookings:any;
  userId: any;
  ticketType:any;
  constructor(public bsModalRef: BsModalRef,
              private service: MainService) { }

  ngOnInit() {
    this.userId = this.bookings.bookingInfo.bookedby
    this.getUser(this.userId);
    console.log(this.bookings.bookingInfo)

    this.getTicketDetails(this.bookings.bookingInfo.tickets[0].ticketid)

  }
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
  getUser(id){
    this.service.getProfile(id)
      .subscribe(res => {
        if (res.user) {
          this.bookedBy = res.user;
        }
      })
  }
  getTicketDetails(id) {
    this.service.getTicketInfo(id)
      .subscribe(r => {
        console.log(r)

        if(r.code == 200){
          console.log(r)
        // this.ticketType = res.tickets[0].ticket_type;
        }
      })
  }
  close(){
    console.log("hi")
    this.bsModalRef.hide();   // the modal hide call to remove the modal.
   document.body.classList.remove('modal-open');
  }

}
