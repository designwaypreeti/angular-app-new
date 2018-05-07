import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.less']
})
export class ProfileCardComponent implements OnInit {
  @Input() card
  constructor() { }

  ngOnInit() {
    // console.log(this.card)
  }

}
