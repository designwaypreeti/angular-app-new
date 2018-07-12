import { Component, OnInit, Input } from '@angular/core'
import { MainService } from '../../shared/services/main.service';

@Component({
  selector: 'app-profile-subscription',
  templateUrl: './profile-subscription.component.html',
  styleUrls: ['./profile-subscription.component.less']
})
export class ProfileSubscriptionComponent implements OnInit {

  @Input() plan = {
    type: 'free',
    price: '0',
    events: null,
    tickets: null,
    booking: '40c',
    src: '/assets/images/free.png',
    selected: false,
    color_scheme: 'black'
  }
  constructor(private mainService : MainService) { }

  ngOnInit() {
  }
  takePayment(amount: number, token: any) {
    let body = {
      email: "preeti.19@gmail.com",
      source_token: token.id,
      amount: amount,
      currency: "USD",
      activity: "Subscription Plan renewal"
    };
    let user = localStorage.getItem('user');
    let uId = JSON.parse(user)._id;

    console.log(uId);
    this.mainService.sendPaymentToken(uId, body)
      .subscribe(res => {

      })
    console.log(body)

  }


  checkOut(amount, tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TNsGjHbknrwF5dfXVhwKzRjt',
      locale: 'auto',
      token: tokenCallback
    });
    handler.open({
      name: 'Stubba',
      zipCode: false,
      amount: amount,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false
    });
  }

    checkoutToPayment(amount){
      let price = Number(amount);
      if(amount > 0){
      this.checkOut(price, (token: any) => this.takePayment(price, token));
      }
    }
}
