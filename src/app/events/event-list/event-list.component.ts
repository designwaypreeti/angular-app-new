import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  user
  events
  constructor(private mainService: MainService) {
    this.user = JSON.parse(localStorage.getItem('user'))    
   }

  ngOnInit() {
    this.getEvents()
  }
  getEvents(){
    this.mainService.getEvents(this.user._id).subscribe(r=>{
      console.log(r)
      this.events = r.events
    },
    e=>{
      
    })
  }

}
