import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core'
import { MONTH, YEAR } from '../../shared/services/defaults'
import { unescapeIdentifier } from '../../../../node_modules/@angular/compiler';
import { MainService } from '../../shared/services/main.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.less']
})
export class CardModalComponent implements OnInit {
  @Input() shown = true
  @Output() hideModal = new EventEmitter<{ shown: boolean }>()
  @Output() cardAdded = new EventEmitter<{ action: string, data: any }>()
  month = MONTH
  year =  YEAR
  selYear;
  selMonth;
  user;
  constructor(private renderer: Renderer2, private mainService: MainService) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'modal-open')
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  hideCard() {
    this.hideModal.emit({ shown: false })
    this.renderer.removeClass(document.body, 'modal-open')
  }
  selectYear(y){
    this.selYear = y;
  }
  selectMonth(m){
    this.selMonth = m;
  }
  sele
  submitted(f) {
    // console.log(f.form.value)
    this.cardAdded.emit({ action: 'SUBMIT', data: f.form.value })
    f.resetForm()
    this.hideModal.emit({ shown: false })

    let data = {
      cardholder: f.name,
      exp_month: this.selMonth,
      exp_year: this.selYear
    }

    this.mainService.addCardProfile(this.user._id, data).subscribe()
  }
}
