import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.less']
})
export class CreateTicketComponent implements OnInit {
  @Output() ticketCreated = new EventEmitter<{ action: string, data: any }>()
  @Input() uId   
  @Input() eId   //5add87517d177b2d9c022739
  titleModel
  types = [
    { id: '1', name: 'General' },
    { id: '2', name: 'VIP' }
  ]
  currencies = [
    { id: '1', name: '$' },
    { id: '2', name: '£' },
    { id: '2', name: '€' }
  ]
  selectedCurrency = { id: '2', name: '€' }

  constructor(private mainService: MainService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  submitted(f) {
    console.log(f.form)
    const data = {
      ticket: f.form.value.title || 'Exclusive Access',
      price: this.selectedCurrency.name + f.form.value.price,
      ticket_type: f.form.value.ticketType || 'Paid ticket',
      quantity: f.form.value.quantity || '100',
      eventId: this.eId
    }
    this.mainService.createTicket(this.eId,this.uId,data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Ticket Created', '', {
          timeOut: 3000,
        })
        this.ticketCreated.emit({ action: 'SUBMIT', data })
        f.resetForm()
      }
      , e => {
        console.log(e)
        this.toastr.error('Error Saving Ticket', '', {
          timeOut: 3000,
        })
      })
    
  }
  _keyPress_price(event: any, called?) {
    let pattern 
    pattern = /[0-9\+\.\+\,\ ]/
    if(called===1){
    pattern = /[0-9\ ]/

    }
    const inputChar = String.fromCharCode(event.charCode)
  
    if (!pattern.test(inputChar) || inputChar === ' ') {
      // invalid character, prevent input
      event.preventDefault()
    }
  }
  blurHandle(){
    if(!this.titleModel) return
    if(!this.titleModel.trim()) this.titleModel = undefined 
    else  this.titleModel = this.titleModel.trim()
  }
}
