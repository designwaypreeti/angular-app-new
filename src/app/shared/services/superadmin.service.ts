import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { URL } from './defaults';

@Injectable()
export class SuperadminService {
  headers
  constructor(private http: HttpClient) {
    this.setHeader()
  }
  setHeader() {
    const token = localStorage.getItem('token')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    console.log(token)
  }
  
  postSubscription(data){
    console.log(JSON.stringify(data))
    this.setHeader();
    return this.http.post<any>(`${URL}/subscription/create`, data,
      { headers: this.headers })
      .map((response)=> { response.json(); console.log(response) })
  }

  updateSubscription(uid,data){
    this.setHeader()
    return this.http.put<any>(`${URL}/subscription/update/${uid}`, data,
      { headers: this.headers })
      .map((response) => { response})
  }

  getSubscriptionList(){
    this.setHeader()
    return this.http.get<any>(`${URL}/subscription/list`,
      { headers: this.headers })
      .map((response) => response)
  }
  getSubscription(pid):Observable<any>{ 
    this.setHeader()
    return this.http.get<any>(`${URL}/subscription/view/${pid}`,
      { headers: this.headers })
      .map(res =>  res)
  }

}
