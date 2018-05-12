import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-profile-bank-details',
  templateUrl: './profile-bank-details.component.html',
  styleUrls: ['./profile-bank-details.component.less']
})
export class ProfileBankDetailsComponent implements OnInit {
  @Output() bankAdded = new EventEmitter<{ action: string, data: any }>()
  user
  constructor(private mainService: MainService, private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit() {
  }
  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/
    const inputChar = String.fromCharCode(event.charCode)

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault()
    }
}
_keyPress_ifbn(event: any) {
  const pattern = /[0-9\+\-\ ]/
  const inputChar = String.fromCharCode(event.charCode)

  if (!pattern.test(inputChar) || inputChar===' ') {
    // invalid character, prevent input
    event.preventDefault()
  }
}
patTest(f){
  console.log(f.controls.bank_name.valid)
}
  submitted(f) {
    console.log(f.form.value)
    const value = f.form.value
    const data = {
      bank_name: value.bank_name,
      account_no: `${value.number}`,
      ifbn: value.ifbn
    }
    this.mainService.addBank(data, this.user._id).subscribe(
      r => {
        console.log(r)
        let data = f.form.value
        data._id = r._id
        this.bankAdded.emit({ action: 'SUBMIT', data: data, })
        this.toastr.success('Bank Details Saved', '', {
          timeOut: 3000,
        })
        f.resetForm()
      }
      , e => {
        console.log(e)
        this.toastr.success('Error Saving Banck Details', '', {
          timeOut: 3000,
        })
      })
  }

}
