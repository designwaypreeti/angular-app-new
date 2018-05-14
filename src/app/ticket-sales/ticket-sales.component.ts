import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-sales',
  templateUrl: './ticket-sales.component.html',
  styleUrls: ['./ticket-sales.component.less']
})
export class TicketSalesComponent implements OnInit {
  @Input() eId 
  constructor() { }

  ngOnInit() {
  }

}
