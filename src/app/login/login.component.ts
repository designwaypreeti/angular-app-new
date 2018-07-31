import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from '../shared/services/login.service'
import { Observable } from 'rxjs/Observable'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  token: string
  constructor(private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService) { }
  ngOnInit() {
  }
  private postLogin(data) {
    this.loginService.authLogin(data)
      .subscribe(r => {
        console.log(r)
        const user = r.user && r.user[0]
        const role = r.user[0].role[0];
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', r.token)
        localStorage.setItem('role',role);
        localStorage.setItem('isCustomer', 'notCustomer');
        if(localStorage.getItem('role')== 'admin'){
          this.router.navigate(['superadmin']);
        }else if(localStorage.getItem('role')== 'event_organiser'){
        this.router.navigate(['profile'])
        } else if (localStorage.getItem('role') == 'customer'){
          localStorage.setItem('isCustomer','customer');
        }
      },
        e => {
          const message = e._body && JSON.parse(e._body)
          console.log(message)
          this.toastr.error((message && message.message) || 'Auth Error', 'Oops!', {
            timeOut: 3000,
          })
        })
  }
  submitted(form) {
    console.log(form.form.value)
    this.postLogin(form.form.value)
    // this.router.navigate([''])
  }
}
