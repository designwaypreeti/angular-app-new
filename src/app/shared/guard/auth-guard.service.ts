import { Injectable } from '@angular/core'
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = !!localStorage.getItem('token')
    if (token) {
      const url = route.url.length > 0 ? route.url[0].path : ''

      console.log(url)
      return true
    } else {
      this.router.navigate(['login'])
    }
  }
}
