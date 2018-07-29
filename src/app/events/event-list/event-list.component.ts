import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service';
import * as moment from 'moment'
import {Events} from './event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  user
  events
  max = 6
  eventStatus:any = ['','',''];
  constructor(private mainService: MainService) {
    this.user = JSON.parse(localStorage.getItem('user'));   
   }

  ngOnInit() {
   this.max = 6
   this.getUpcomingEvents();
  }
  more(){
    this.max=this.max+6
  }
  getCompletedEvents(){
    this.eventStatus[0] = '';
    this.eventStatus[1] = 'active';
    this.eventStatus[2] = '';
    this.getEvents('completed');
  }

  getDraftEvents() {
    this.eventStatus[0] = '';
    this.eventStatus[1] = '';
    this.eventStatus[2] = 'active';
    this.getEvents('draft');
  }

  getUpcomingEvents(){
    this.eventStatus[0] = 'active';
    this.eventStatus[1] = '';
    this.eventStatus[2] = '';
    this.mainService.getEvents(this.user._id).subscribe(r => {
      console.log(r)
      this.events = r.events
      this.events.map(ev => {
        ev.info.dateDay = moment(ev.info.start_date).format('DD')
        ev.info.dateMonth = moment(ev.info.start_date).format('MMM')

      })
    },
      e => {
      })
  }

  getEvents(currentStatus){
    this.mainService.getEventsByStatus(this.user._id, currentStatus)
    .subscribe( res=>{
      this.events = res.events;
      if(this.events){
        this.events.map(ev => {
          ev.info.dateDay = moment(ev.info.start_date).format('DD')
          ev.info.dateMonth = moment(ev.info.start_date).format('MMM')

        })
      }
    })
  }
}
