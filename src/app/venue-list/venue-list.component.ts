import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.less']
})
export class VenueListComponent implements OnInit {
  venues
  user
  activeVenue
  shown = false  
  map={
    lat:null,
    lng:null
  }
  constructor(private mainService: MainService) {
    this.user = JSON.parse(localStorage.getItem('user'))    
   }

  ngOnInit() {
    this.fetchVenues()
  }
  selectVenue(venue){
    this.activeVenue = venue
    this.map = JSON.parse(this.activeVenue.location)    
  }
  fetchVenues() {
    this.mainService.getAllVenue(this.user._id).subscribe(r => {
      console.log(r.venues)
      this.venues = r.venues
      if(this.venues.length){
          this.activeVenue= this.venues[0]
          this.map = JSON.parse(this.activeVenue.location)
      }
      //fetching event detais if event id is provided, function returns if its not
    }, e => { })
  }
  showModal() {
    console.log(1)
    this.shown = true
  }
  async hideModal(data) {
    await this.fetchVenues()
    if (data.shown === false) {
      this.shown = false
    }
  }

}
