import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable()
export class OrganiserGuardService  implements CanActivate{

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.role == 'event_organiser') {

      return true;
    } else {
      return false;
    }

  }
}
