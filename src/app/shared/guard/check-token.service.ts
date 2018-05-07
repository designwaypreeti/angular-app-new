import { Injectable } from '@angular/core'
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router'

@Injectable()
export class CheckTokenService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token')
                  && this.parseJwt(localStorage.getItem('token'))
    if (token){
      const currentDate = new Date()
      console.log(token.exp,Math.round(currentDate.getTime()/1000))
      if(token.exp>Math.round(currentDate.getTime()/1000)) return true
    }
    localStorage.clear()
    this.router.navigate(['login'])
  }
  parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }
}
