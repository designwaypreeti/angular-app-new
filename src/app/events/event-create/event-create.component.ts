import { Component, OnInit } from '@angular/core'
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable'
import { startWith } from 'rxjs/operators/startWith'
import { map } from 'rxjs/operators/map'
import { Event } from '../../shared/models/event.model'
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
  eId// = '5aeb4bfcf00fbb2ce092001a'
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
  tickets = [
    {
      title: 'Exclusive Access',
      price: '£45.00',
      type: 'Paid ticket',
      quantity: '100'
    }
  ]
  reader = new FileReader()

  constructor(private mainService: MainService, private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit() {
    console.log(this.tickets)
    this.fetchVenues()
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
    console.log(res.data)
    this.tickets.push(res.data)
  }
  getEvents() {
    if (!this.eId) return
    this.mainService.getEvent(this.eId).subscribe(r => {
      console.log(r)
      this.currentEvent = r.events && r.events.length && r.events[0]
      this.startDate = this.currentEvent.start_date
      this.endDate = this.currentEvent.end_date
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
    if (!this.selectedFile) return
    //uploading file to cloudinary
    this.uploading = true
    if (!!this.selectedFile === false) return
    this.mainService.uploadCloud(this.selectedFile).subscribe(r => {
      console.log(r.secure_url)
      this.secure_url = r.secure_url
      this.uploading = false
      //updating/creating event
      data.image = this.secure_url
      if (this.eId) this.updateEvent(data)
      else this.createEvent(this.user._id, data)
    },
      e => {
        this.uploading = false
      })
  }
  submitFinal(f){

    const data = { ...f.form.value }
    if (this.eId) this.updateEvent(data)
  }
  createEvent(uid, data) {
    this.mainService.createEvent(uid, data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Event Saved', '', {
          timeOut: 3000,
        })
        this.eId = r.result._id
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
  updateEvent(data) {
    this.mainService.updateEvent(this.eId, data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Event Saved', '', {
          timeOut: 3000,
        })
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