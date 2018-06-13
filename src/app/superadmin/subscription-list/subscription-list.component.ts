import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../shared/services/superadmin.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.less']
})
export class SubscriptionListComponent implements OnInit {

  constructor(private adminService:SuperadminService) { }
  plans:any=[];
  ticketLimitUld: any;
  eventLimitUld:any;
  ngOnInit() {
    this.getPlans();
    this.checkLimit();
  }

  getPlans(){
    this.adminService.getSubscriptionList()
      .subscribe((result)=>{
        console.log(result);
        this.plans = result.list;
      })
  }

  checkLimit(){
    if (this.plans.no_of_tickets = 0){
      this.ticketLimitUld = true;
    }else {
      this.ticketLimitUld = false;
    }
    if(this.plans.no_of_events = 0){
      this.eventLimitUld = true;
    }else{
      this.eventLimitUld = false;
    }
  }

}
