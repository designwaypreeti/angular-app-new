import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core'
import { MainService } from '../../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-venue-create-modal',
  templateUrl: './venue-create-modal.component.html',
  styleUrls: ['./venue-create-modal.component.less']
})
export class VenueCreateModalComponent implements OnInit {
  @Input() shown = true
  @Output() hideModal = new EventEmitter<{ shown: boolean }>()
  @Output() venueCreated = new EventEmitter<{ done: boolean }>()
  title: string = 'My first AGM project'
  mapSpinner = false
  lat: number = 51.678418
  lng: number = 7.809007
  markLat: number
  markLng: number
  user

  constructor(
    private renderer: Renderer2,
    private mainService: MainService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.renderer.addClass(document.body, 'modal-open')
  }
  createVenue(uId, data) {
    this.mainService.createVenue(uId, data).subscribe(
      r => {
        console.log(r)
        this.toastr.success('Venue Saved', '', {
          timeOut: 3000,
        })
        this.hideCard()
      }
      , e => {
        console.log(e)
        this.toastr.error('Error Saving Venue', '', {
          timeOut: 3000,
        })
        this.hideCard()
      })
  }
  hideCard() {
    this.hideModal.emit({ shown: false })
    this.renderer.removeClass(document.body, 'modal-open')
  }
  doneTyping(f){
    this.mapSpinner = true
    const data = {... f.form.value}
    console.log(data)
    const {address , postal} = data
    if(address) this.mainService.addressFetchGeo(address,postal? postal : '').subscribe(succ=>{
      console.log(succ)
      let coord = succ.info
                  && succ.info.results[0]
                  && succ.info.results[0].geometry
                  && succ.info.results[0].geometry.location
      console.log(coord)
      if(coord){
          this.lat = this.markLat = coord.lat
          this.lng = this.markLng = coord.lng
      }
    },err=>{
      console.log(err)
    },()=>{
     this.mapSpinner = false
    })
  }
  geoClick(e) {
    console.log(e)
    this.markLng = e.coords['lng']
    this.markLat = e.coords['lat']
  }
  submitted(f) {
    const data = { ...f.form.value }
    data['location'] = JSON.stringify({
      lat: this.markLat,
      lng: this.markLng
    })
    this.createVenue(this.user._id, data)
    f.resetForm()
  }

}
