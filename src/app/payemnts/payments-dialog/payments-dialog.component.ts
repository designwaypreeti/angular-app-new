import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service';

@Component({
  selector: 'app-payments-dialog',
  templateUrl: './payments-dialog.component.html',
  styleUrls: ['./payments-dialog.component.less']
})
export class PaymentsDialogComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
    let uId = localStorage.getItem('user');
    console.log(uId);
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
    this.mainService.sendPaymentToken(uId,body)
    .subscribe(res=>{
      
    })
  console.log(body)

  }


  checkOut(amount, tokenCallback){
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TNsGjHbknrwF5dfXVhwKzRjt',
      locale: 'auto',
      token: tokenCallback
    });

    handler.open({
      name: 'Stubba',
      zipCode: false,
      currency: 'gbp',
      amount: amount,
      panelLabel: "Pay {{amount}}",
      allowRememberMe: false
    });
  }

  makePayment(){
    this.checkOut( 1000, (token: any) => this.takePayment( 1000, token));
  }

  }


