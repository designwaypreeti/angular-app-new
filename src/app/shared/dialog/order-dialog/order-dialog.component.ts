import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.less']
})
export class OrderDialogComponent implements OnInit {
  bookingData:any;
  bookedBy:any;
  userAvailable: boolean  = false;
  constructor(public dialog:MatDialog,
              public dialogRef: MatDialogRef<OrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data:{ booking: any},
              private service:MainService) { }

  ngOnInit() {
    this.bookingData = this.data.booking;
    this.getUser(this.bookingData.bookingInfo.bookedby)
    this.getTicketDetails(this.bookingData.bookingInfo.tickets[0].ticketid)
  }
  getUser(id:string){
    this.service.getProfile(id)
    .subscribe(res=>{
      if(res.user){
        this.bookedBy = res.user;
        this.userAvailable = true;
      }
    })
  }
  getTicketDetails(id){
    console.log(id)
    this.service.getTicket(id)
    .subscribe(res=>{
        console.log(res)
    })
  }
  close() {
    this.dialog.closeAll();
  }

}
