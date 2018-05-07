import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { URL } from './defaults'
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  authLogin(user) {
    console.log(user)
    return this.http.post<any>(`${URL}/user/login`, user)
    // .catch((res: any) => Observable.throw(res))
  }
}
