import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  orders
  eId=`5b0298df5ded2b0004a46ece`
  uId
  user
  constructor( private mainService: MainService, private route: ActivatedRoute) {
    this.eId = route.snapshot.queryParams && route.snapshot.queryParams.id
    this.user = JSON.parse(localStorage.getItem('user'))
   }

  ngOnInit() {
    this.mainService.getOrders(this.user._id, this.eId).subscribe(r=>{
      console.log(r)
    },e=>{
      console.log(e)
    })
  }

}
