import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material";
import { OrderDialogComponent } from '../shared/dialog/order-dialog/order-dialog.component';

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

  constructor(private mainService: MainService,
               private route: ActivatedRoute, 
               private dialog : MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  selectBooking(booking){
    this.selectedBooking=booking;
    
    let dialogRef = this.dialog.open(OrderDialogComponent, { 
      width: 'auto',
      height: 'auto',
      data: { booking: booking }
    });
    dialogRef.afterClosed().subscribe(res=>{
    })
  }
  close(){
    this.selectedBooking=undefined;
  }
  ngOnInit() {
    this.mainService.getOrders(this.user._id).subscribe(r => {
      this.bookings = r.bookings;
    }, e => {
      console.log(e)
    })
  }

}
