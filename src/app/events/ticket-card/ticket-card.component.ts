import { Component, OnInit, Input } from '@angular/core'
import { tick } from '@angular/core/testing'

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.less']
})
export class TicketCardComponent implements OnInit {
  @Input() ticket
  
  constructor() { }

  ngOnInit() {
    console.log(this.ticket)
  }

}
