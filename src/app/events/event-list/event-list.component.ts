import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service';
import * as moment from 'moment'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  user
  events
  max = 6
  constructor(private mainService: MainService) {
    this.user = JSON.parse(localStorage.getItem('user'))    
   }

  ngOnInit() {
   this.max = 6
   this.getEvents()
  }
  more(){
    this.max=this.max+6
  }
  getEvents(){
    this.mainService.getEvents(this.user._id).subscribe(r=>{
      console.log(r)
      this.events = r.events
      this.events.map(ev=>{
        ev.info.dateDay = moment(ev.info.start_date).format('DD')
        ev.info.dateMonth = moment(ev.info.start_date).format('MMM')

      })
    },
    e=>{
      
    })
  }

}
