import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-profile-bank-details-card',
  templateUrl: './profile-bank-details-card.component.html',
  styleUrls: ['./profile-bank-details-card.component.less']
})
export class ProfileBankDetailsCardComponent implements OnInit {
  @Input() bank
  @Output() deleteBank = new EventEmitter<{ bank: any }>()
  selectedCard = ''
  cardOptions = [
    {
      value: 'delete',
      viewValue: 'Delete'
    },
  ]
  constructor() { }

  ngOnInit() {
    console.log(this.bank)
  }
  delete() {
    this.selectedCard = ''
    this.deleteBank.emit({ bank: this.bank }) 
  }
  onSelectedObjChanged(e){
    this.delete()
    return
  }
}
