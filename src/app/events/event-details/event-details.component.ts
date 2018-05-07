import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable'
import { startWith } from 'rxjs/operators/startWith'
import { map } from 'rxjs/operators/map'
import { Event } from '../../shared/models/event.model'
import { getPluralCategory } from '@angular/common/src/i18n/localization';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.less']
})
export class EventDetailsComponent implements OnInit {
  eId = '5aeb4bfcf00fbb2ce092001a'
  category 
  options
  tdStates
  currentEvent = new Event
  startDate
  user
  endDate
  currentState
  venue
  selectedFakeUrl
  secure_url
  constructor(private mainService: MainService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchVenues()
  }
  fetchVenues() {
    this.mainService.getAllVenue(this.user._id).subscribe(r => {
      console.log(r.venues)
      this.options = r.venues
      this.tdStates = [...this.options]
      //fetching event detais if event id is provided, function returns if its not
      this.getEvents()
    }, e => { })
  }
  getEvents() {
    if (!this.eId) return
    this.mainService.getEvent(this.eId).subscribe(r => {
      console.log(r)
      this.currentEvent = r.events && r.events.length && r.events[0]
      this.startDate = this.currentEvent.start_date
      this.endDate = this.currentEvent.end_date
      let x
      x = this.options.filter(x => {
        if (this.currentEvent.venue === x._id) return true
        else return false
      })
      if (x && x.length >= 0) {
        this.venue = x[0]
        this.currentState = x[0].venue_name
      }
      switch (this.currentEvent.event_category) {
        case 'food':
          this.category = 1
          break
        case 'fine dining':
          this.category = 2
          break
        case 'dance':
          this.category = 3
          break
        case 'beach':
          this.category = 4
          break
        case 'karaoke':
          this.category = 5
          break
        case 'music':
          this.category = 6
          break
      }

      this.selectedFakeUrl 
      = this.secure_url
      = this.currentEvent.event_image
        ? this.currentEvent.event_image
        : undefined
      
      console.log(this.currentState)
    }, e => { })
  }
}
