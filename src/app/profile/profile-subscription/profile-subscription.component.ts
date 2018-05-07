import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-profile-subscription',
  templateUrl: './profile-subscription.component.html',
  styleUrls: ['./profile-subscription.component.less']
})
export class ProfileSubscriptionComponent implements OnInit {
  @Input() plan = {
    type: 'free',
    price: '0',
    events: null,
    tickets: null,
    booking: '40c',
    src: '/assets/images/free.png',
    selected: false,
    color_scheme: 'black'
  }
  constructor() { }

  ngOnInit() {
  }

}
