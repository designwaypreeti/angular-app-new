import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core'
import { MONTH, YEAR } from '../../shared/services/defaults'

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
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'modal-open')
  }
  hideCard() {
    this.hideModal.emit({ shown: false })
    this.renderer.removeClass(document.body, 'modal-open')
  }
  submitted(f) {
    // console.log(f.form.value)
    this.cardAdded.emit({ action: 'SUBMIT', data: f.form.value })
    f.resetForm()
    this.hideModal.emit({ shown: false })
  }
}
