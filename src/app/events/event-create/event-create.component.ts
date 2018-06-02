import { Component, OnInit } from '@angular/core'
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable'
import { startWith } from 'rxjs/operators/startWith'
import { map } from 'rxjs/operators/map'
import { Event } from '../../shared/models/event.model'
import * as moment from 'moment'
import * as momentTime from 'moment-timezone'
import { Router, ActivatedRoute } from '@angular/router'
// This is the parent component for the event's create page
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.less']
})
export class EventCreateComponent implements OnInit {
  tab = 1
  category = 1
  shown = false
  eId //= '5af2a1d12c82b9000475ac32'
  currentEvent = new Event
  secure_url
  options = [
  ]
  startDate
  endDate
  tdStates
  uploading = false
  invalidVenue = false
  venue
  currentState
  today = new Date()
  categories = {
    1: 'food',
    2: 'fine dining',
    3: 'dance',
    4: 'beach',
    5: 'karaoke',
    6: 'music'
  }
  selectedFile = null
  selectedFakeUrl
  user
  start ={
    hours:undefined,
    minutes:undefined
  }
  end ={
    hours:undefined,
    minutes:undefined
  }
  tickets = [
  ]
  selectedTicket = {
    _id: undefined,
    eventId: undefined,
    price:undefined,
    quantity:undefined,
    title: undefined,
    ticket_type:undefined,
  }
  reader = new FileReader()

  constructor(private mainService: MainService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
    this.eId = route.snapshot.queryParams && route.snapshot.queryParams.id
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  ngOnInit() {
    // console.log(momentTime.tz.names())
    console.log(this.tickets)
    this.fetchVenues()
    this.fetchTickets()
  }
  _keyPressHours(event: any, val, time, obj) {
    const pattern = /[0-9\+\-\ ]/
    const inputChar = String.fromCharCode(event.charCode)
    // console.log(parseInt(inputChar))
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault()
    } else{
      if(inputChar ==" " || inputChar== "-"){
        event.preventDefault()
      }
      val = val + inputChar 
      const value = parseInt(val)
      console.log(value)
      
      if(time==1) {
        if(value>23) {
        this[obj].hours = 23
        event.preventDefault()
        } else if(value<0){
          this[obj].hours = 0
          event.preventDefault()
        }
    }
      if(time==2) {
        if(value>59) {
        event.preventDefault()
        this[obj].minutes = 59
        }else if(value<0){
          this[obj].hours = 0
          event.preventDefault()
        }
    }
    }
    
}
  fetchTickets(){
      if(this.eId){
        this.mainService.getTicket(this.eId).subscribe(
          r=>{
            console.log(r)
            if(!r.tickets || r.tickets.length ===0) return
            this.tickets = r.tickets.map(ele=>{
              return {
                _id: ele._id,
                price:ele.ticket_price,
                quantity: ele.quantity,
                title:ele.ticket_name,
                ticket_type:ele.ticket_type,
                eventId: this.eId
              }
            })
          }
          ,e=>{})
      }
  }    

  selectTicket(ticket){
    this.selectedTicket = {...ticket}
  }
  fetchVenues() {
    this.mainService.getAllVenue(this.user._id).subscribe(r => {
      console.log(r.venues)
      this.options = r.venues
      this.tdStates = [...this.options]
      //fetching event detais if event id is provided, function returns if its not
      this.getEvents()
    }, e => { })
  }
  filterStates(val: string) {
    if (val) {
      const filterValue = val.toLowerCase()
      return this.options.filter(
        state => state.venue_name
          && state.venue_name
            .toLowerCase()
            .startsWith(filterValue))
    }
    return this.options
  }
  detectChange() {
    this.invalidVenue = false
    setTimeout(() => {
      let t = this.options.find(x => x.venue_name == this.currentState)
      console.log('lol', t)
      if (!!t === false) this.invalidVenue = true
      this.venue = t
    }, 400)

  }
  showModal() {
    console.log(1)
    this.shown = true
  }
  async hideModal(data) {
    await this.fetchVenues()
    if (data.shown === false) {
      this.shown = false
    }
  }

  fileChange(event) {
    // console.log(event)
    // console.log(event.target.files)
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
    this.reader.onload = (event: any) => {
      this.selectedFakeUrl = event.target.result;
    }

    this.reader.readAsDataURL(this.selectedFile);
    console.log(this.selectedFile, this.selectedFakeUrl)
  }
  async fileDragged(event) {
    // console.log(event)
    this.selectedFile = event[0]
    this.reader.onload = (event: any) => {
      this.selectedFakeUrl = event.target.result;
    }

    this.reader.readAsDataURL(this.selectedFile);
    console.log(this.selectedFile, this.selectedFakeUrl)
  }
  ticketCreated(res) {
    if(res.action==='CANCEL'){
      this.selectedTicket = {
        _id: undefined,
        eventId: undefined,
        price:undefined,
        quantity:undefined,
        title: undefined,
        ticket_type:undefined,
      }
      return
    } else if(res.action==='UPDATE'){
       console.log(res.data)
      this.tickets = this.tickets.map(ticket=>{
        if(ticket._id===this.selectedTicket._id) {
          return res.data
        }
        return ticket
      })
      this.selectedTicket = {
        _id: undefined,
        eventId: undefined,
        price:undefined,
        quantity:undefined,
        title: undefined,
        ticket_type:undefined,
      }
     
    }else if(res.action==='DELETE'){

    }else if(res.action==='CREATE'){
      let ticket = res.data
      ticket.title = res.data.ticket
      this.tickets.unshift(ticket)
    }
    console.log(this.tickets)
    
  }
  splitTime(timeStr){
    let arr = timeStr.split(':')
    return{
      hours:(arr && arr.length>=0 && arr[0]) || 0,
      minutes:(arr && arr.length>0 && arr[1]) || 0
    }
  }
  getEvents() {
    if (!this.eId) return
    this.mainService.getEvent(this.eId).subscribe(r => {
      console.log(r)
      this.currentEvent = r.events && r.events.length && r.events[0]
      this.startDate = this.currentEvent.start_date
      this.endDate = this.currentEvent.end_date
      this.start = this.splitTime(this.currentEvent.start_time)
      this.end = this.splitTime(this.currentEvent.end_time)
      let x
      x = this.options.filter(x => {
        if (this.currentEvent.venue === x._id) return true
        else return false
      })
      if (x && x.length >= 0) {
        this.venue = x[0]
        this.currentState = x[0].venue_name
      }
      switch (this.currentEvent.event_category) {
        case 'food':
          this.category = 1
          break
        case 'fine dining':
          this.category = 2
          break
        case 'dance':
          this.category = 3
          break
        case 'beach':
          this.category = 4
          break
        case 'karaoke':
          this.category = 5
          break
        case 'music':
          this.category = 6
          break
      }

      this.selectedFakeUrl 
      = this.secure_url
      = this.currentEvent.event_image
        ? this.currentEvent.event_image
        : undefined
      
      console.log(this.currentState)
    }, e => { })
  }
  submitted(f) {
    console.log(f)
    const data = { ...f.form.value }
    data.category = this.categories[this.category]
    data.venueId = this.venue._id
    //seeting times
    data.start_time = this.start.hours+':'+ this.start.minutes
    data.end_time = this.end.hours+':'+ this.end.minutes
    if (!this.selectedFile && !this.selectedFakeUrl) return
    //uploading file to cloudinary
    this.uploading = true
    if (!!this.selectedFile == true) {
    this.mainService.uploadCloud(this.selectedFile).subscribe(r => {
      console.log(r.secure_url)
      this.secure_url = r.secure_url
      this.uploading = false
      //updating/creating event
      data.image = this.secure_url
      data.event_status = "Draft"
      if (this.eId) this.updateEvent(data)
      else this.createEvent(this.user._id, data)
    },
      e => {
        this.uploading = false
      })
    } else if(this.selectedFakeUrl){
      console.log("here")
      this.uploading = false      
      data.image = this.selectedFakeUrl
      if (this.eId) this.updateEvent(data)
      else this.createEvent(this.user._id, data)
    }
  }
  submitFinal(f, isDraft?){

    const data = { ...f.form.value }
    data.event_status = isDraft==1 ? "Draft" : "Published"
    if (this.eId) this.updateEvent(data,3)
  }
  createEvent(uid, data) {
    this.mainService.createEvent(uid, data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Event Saved', '', {
          timeOut: 3000,
        })
        this.eId = r.result._id
        this.tab = 1
        // f.resetForm()
      }
      , e => {
        console.log(e)
        this.toastr.error('Error Saving Event', '', {
          timeOut: 3000,
        })
      })
  }
  updateEvent(data,calledFrom?) {
    this.mainService.updateEvent(this.eId, data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Event Saved', '', {
          timeOut: 3000,
        })
        if(calledFrom===3)   this.router.navigate(['events'])
        this.tab = 2
        // f.resetForm()
      }
      , e => {
        console.log(e)
        this.toastr.error('Error Saving Event', '', {
          timeOut: 3000,
        })
      })
  }

}