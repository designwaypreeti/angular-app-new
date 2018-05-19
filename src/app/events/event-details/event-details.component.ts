import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable'
import { startWith } from 'rxjs/operators/startWith'
import { map } from 'rxjs/operators/map'
import { Event } from '../../shared/models/event.model'
import { getPluralCategory } from '@angular/common/src/i18n/localization';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.less']
})
export class EventDetailsComponent implements OnInit {
  eId 
  category 
  book
  options
  tdStates
  currentEvent = new Event
  startDate
  user
  endDate
  currentState
  venue
  loc
  eventStatus = 'Draft'
  selectedFakeUrl
  secure_url
  currentUrl
  constructor(private mainService: MainService, 
              private toastr: ToastrService,
              private route: ActivatedRoute
            ) { 
    this.user = JSON.parse(localStorage.getItem('user'))
    this.eId = this.route.snapshot.params && this.route.snapshot.params.id
    this.book = route.snapshot.queryParams && route.snapshot.queryParams.booked
    console.log(route.snapshot.queryParams)
  }

  ngOnInit() {
    console.log(1)
    this.getEvents()
  }
  changeStatus(e){
    console.log(e.target.value)
    this.eventStatus = (e.target.value) ? e.target.value : "Draft"
    const data = {
      event_status : this.eventStatus
    }
    this.mainService.updateEvent(this.eId,data).subscribe(s=>{
      console.log(s)
    },e=>{})
  }
  fetchVenues(venue) {
    this.mainService.getAllVenue(this.user._id).subscribe(r => {
      this.venue = r.venues.find(x=> x._id === venue)
      console.log(this.venue.location)
      this.loc = JSON.parse(this.venue.location)
      //fetching event detais if event id is provided, function returns if its not
    }, e => { })
  }
  getEvents() {
    if (!this.eId) return
    this.mainService.getEvent(this.eId).subscribe(r => {
      console.log(r)
      this.currentEvent = r.events && r.events.length && r.events[0]
      this.eventStatus = (this.currentEvent.status) ? this.currentEvent.status : "Draft" 
      
      console.log(this.currentEvent)
      if(this.currentEvent.venue){
        this.fetchVenues(this.currentEvent.venue)
      }
      this.startDate = this.currentEvent.start_date
      this.endDate = this.currentEvent.end_date
      this.selectedFakeUrl 
      = this.currentEvent.event_image
        ? this.currentEvent.event_image
        : undefined
      
      console.log(this.currentState)
    }, e => { })
  }
}
