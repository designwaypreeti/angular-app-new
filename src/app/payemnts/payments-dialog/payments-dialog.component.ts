import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/services/main.service';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-payments-dialog',
  templateUrl: './payments-dialog.component.html',
  styleUrls: ['./payments-dialog.component.less']
})
export class PaymentsDialogComponent implements OnInit {
  userId:any;
  cardList:any = [];
  accBalance:any = 20;
  cardVal;
  price;
  paymentInitiated:boolean = false;
  subscription:boolean = false;
  constructor(private mainService: MainService,
              public modalref:BsModalRef) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user');
    console.log(this.userId);
    this.getCards();
    this.subscription;
  }
  

  getCards() {
    this.mainService.getCardList(this.userId)
      .subscribe(res => {
        console.log(res);
        this.cardList = res.result.data;
      })
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

  }


  checkOut(amount, tokenCallback){
    let self = this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TNsGjHbknrwF5dfXVhwKzRjt',
      locale: 'auto',
      token: tokenCallback
    });
    amount*=100;
    handler.open({
      name: 'Stubba',
      zipCode: false,
      currency: 'usd',
      amount: amount,
      allowRememberMe: false
    })
    setTimeout(() => {
      this.paymentInitiated = false;
    }, 6000);
  }

  close(){
    this.modalref.hide()
  }

  makePayment(){
    this.paymentInitiated = true;
    console.log(this.cardVal)
    if(this.cardVal){
      // this.takePayment()
    }else{
      this.checkOut(this.price, (token: any) => this.takePayment(this.price, token));

    }
  }

 

  }


