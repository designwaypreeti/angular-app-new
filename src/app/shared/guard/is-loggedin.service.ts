import { Injectable } from '@angular/core'
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router'

@Injectable()
export class IsLoggedinService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = !!localStorage.getItem('token')
    if (token) {
      this.router.navigate([''])
    } else {
      return true
    }
  }
}
