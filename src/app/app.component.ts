import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app'
  loginPathHide = false
  menu = false
  menueMobile = false
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // console.log(this.route.snapshot)
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e.url)
        this.loginPathHide = e.url.includes('/login')
          || e.url.includes('/forgot-password')
          || e.url.includes('/reset-password') ? false : true
        console.log(this.loginPathHide)
      }
    })
  }
  path() {
    return (this.router.url !== '/login') ? false : true
  }
  toggleMenu(close?){
    this.menu = close ? false : !this.menu
  }
  mobileToggle(close?){
    this.menueMobile = close ? false : !this.menueMobile
    console.log(close,this.menueMobile)
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
