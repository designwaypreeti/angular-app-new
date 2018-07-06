import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { URL } from './defaults'

@Injectable()
export class MainService {
  headers
  constructor(private http: HttpClient) {
    this.setHeader()
  }
  setHeader() {
    const token = localStorage.getItem('token')
    this.headers = new HttpHeaders().set('Content-Type', `application/json`)
    this.headers = new HttpHeaders().set( 'Authorization', `Bearer ${token}`)
  }
  getProfile(id) {
    this.setHeader()
    return this.http.get<any>(`${URL}/user/profile/${id}`,
      { headers: this.headers })
      .map(r => r)
  }
  getSubscriptions() {
    this.setHeader()
    return this.http.get<any>(`${URL}/subscription/list`,
      { headers: this.headers })
      .map(r => r)
  }
  userSubscribe(plaId, id) {
    this.setHeader()
    const data = {
      "subId": plaId
    }
    return this.http.post<any>(`${URL}/user/subscription/${id}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  updateProfile(data, id) {
    this.setHeader()
    return this.http.put<any>(`${URL}/user/profile/${id}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  addBank(data, id) {
    this.setHeader()
    console.log(data)
    return this.http.post<any>(`${URL}/user/bankaccounts/${id}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  deleteBank(id,bankId) {
    this.setHeader()
    // console.log(data) user/bankaccounts?uid=5ad70ab7935b6d4450fdb003&bankid=5ad8548015f8344cdb5f0d77
    return this.http.delete(`${URL}/user/bankaccounts?uid=${id}&bankid=${bankId}`,

      { headers: this.headers }
    )
      .map(r => r)
  }
  getEvent(eid){
    this.setHeader()
    return this.http.get<any>(`${URL}/event/${eid}`,
      { headers: this.headers }
    )
      .map(r => r)
  }
  getEvents(uid){
    this.setHeader()
    return this.http.get<any>(`${URL}/event/getall?uid=${uid}`,
      { headers: this.headers }
    )
      .map(r => r)
  }
  createEvent(uid,data){
    this.setHeader()
    console.log(data)
    return this.http.post<any>(`${URL}/event/create?uid=${uid}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  updateEvent(eid,data){
    this.setHeader()
    console.log(data)
    return this.http.put<any>(`${URL}/event/${eid}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }

  createTicket(eid,uid,data){
    this.setHeader()
    console.log(data)
    return this.http.post<any>(`${URL}/event/ticket?uid=${uid}&eventid=${eid}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  getTicket(eid){
    this.setHeader()
    return this.http.get<any>(`${URL}/event/ticket?eventId=${eid}`,
      { headers: this.headers }
    )
      .map(r => r)
  }
  updateTickets(data,_id){
    return this.http.put<any>(`${URL}/event/ticket/${_id}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  bookTicket(eid,uid,tickets,total){
    this.setHeader()
    // console.log(data)
    const  dateNow= new Date()
    const data = {
      total,
      tickets,
      dateNow,
      status:'booked'
    }
    return this.http.post<any>(`${URL}/event/booking?uid=${uid}&eventid=${eid}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  createVenue(uid,data){
    this.setHeader()
    console.log(data)
    return this.http.post<any>(`${URL}/venue/create/${uid}`,
      data,
      { headers: this.headers }
    )
      .map(r => r)
  }
  addressFetchGeo(address,postal){
    address = {
                  address,
                  postal
                }    
    this.setHeader()
    return this.http.post<any>(`${URL}/venue/coordinates`,
    address,
      { headers: this.headers }
    )
      .map(r => r)
  }
  getAllVenue(uid){
    return this.http.get<any>(`${URL}/venue/getall/${uid}`,
      { headers: this.headers }
    )
      .map(r => r)
  }
  getOrders(uId){
    let data ={};
    this.setHeader()
    return this.http.post<any>(`${URL}/event/orders?uid=${uId}`, data ,{ headers:this.headers }
    )
      .map(r => r)
  }
  uploadCloud(data) {
    let headers = new HttpHeaders()
    const cloud='rubiq-solutions'  // cloud here
    const preset = 'e1copsnw' // unsigned preset here
    let params: FormData = new FormData()
    params.append('upload_preset', preset)
    params.append('file', data)
    headers.append('X-Requested-With', 'XMLHttpRequest')
    return this.http.post<any>(`https://api.cloudinary.com/v1_1/${cloud}/upload`, params, {headers})
    .map(data => data)
  }
  getTicketInfo(ticketId){
    return this.http.get<any>(`${URL}/event/ticket/view/${ticketId}`, { headers: this.headers})
    .map(r=>r)
  }
  sendPaymentToken(uId, data){
    return this.http.post<any>(`${URL}/payment/create?${uId}`, data , { headers: this.headers })
      .map(r => r)
  }
}
