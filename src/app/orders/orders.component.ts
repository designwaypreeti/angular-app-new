import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  orders
  uId
  user
  selectedBooking
  bookings = [
    {
      "bookingInfo": {
        "_id": "5b07fe67d7e65f0004e8ccf9",
        "bookingid": "1001",
        "eventid": "5b0298df5ded2b0004a46ece",
        "bookedby": "5af1bcacb552510004fe71a2",
        "bookingdate": "2018-04-24T00:00:00.000Z",
        "status": "Booked",
        "__v": 0,
        "tickets": [
          {
            "ticketid": "5af290463ccd550004017dc6",
            "quantity": 2,
            "price": 10,
            "code": '71-0065',
            "type":"general"
          }
        ]

      },
      "eventInfo": {
        "_id": "5b0298df5ded2b0004a46ece",
        "event_name": "Test",
        "event_description": "Test",
        "start_date": "2018-05-23T22:00:00.000Z",
        "start_time": "12:30",
        "end_date": "2018-05-25T22:00:00.000Z",
        "end_time": "13:20",
        "venue": "5af538f00c32a049ecfea15f",
        "event_category": "beach",
        "user": {"id":"5af1bcacb552510004fe71a2", "name": "Ben Shapiro", "phone":"+44 123 456 7890"},
        "status": "Published",
        "event_image": "https://res.cloudinary.com/rubiq-solutions/image/upload/v1526896866/c2wrusxkhxkwrovlwxxn.png",
        "__v": 0,
        "event_timezone": "GMT +1",
        "terms_condition": "Hey"

      }

    },
    {
      "bookingInfo": {
        "_id": "5b080386d7e65f0004e8ccfa",
        "bookingid": "1002",
        "eventid": "5b0298df5ded2b0004a46ece",
        "bookedby": "5af1bcacb552510004fe71a2",
        "bookingdate": "2018-04-24T00:00:00.000Z",
        "status": "Booked",
        "__v": 0,
        "tickets": [
          {
            "ticketid": "5af290463ccd550004017dc6",
            "quantity": 2,
            "price": 10,
            "code": '71-0065',
            "type":"general"
          }
        ]
      },
      "eventInfo": {
        "_id": "5b0298df5ded2b0004a46ece",
        "event_name": "Test",
        "event_description": "Test",
        "start_date": "2018-05-23T22:00:00.000Z",
        "start_time": "12:30",
        "end_date": "2018-05-25T22:00:00.000Z",
        "end_time": "13:20",
        "venue": "5af538f00c32a049ecfea15f",
        "event_category": "beach",
        "user": {"id":"5af1bcacb552510004fe71a2", "name": "Mike Tyson", "phone":"+44 123 456 7890"},
        "status": "Published",
        "event_image": "https://res.cloudinary.com/rubiq-solutions/image/upload/v1526896866/c2wrusxkhxkwrovlwxxn.png",
        "__v": 0,
        "event_timezone": "GMT +1",
        "terms_condition": "Hey"
      }
    },

    {

      "bookingInfo": {

        "_id": "5b1b68aee2a2d70004488087",

        "bookingid": "1005",

        "eventid": "5b1b6730e2a2d70004488083",

        "bookedby": "5af0371c0b0fee00041435ba",

        "bookingdate": "2018-04-24T00:00:00.000Z",

        "status": "Booked",

        "__v": 0,

        "tickets": [

          {

            "ticketid": "5af290463ccd550004017dc6",

            "quantity": 2,
            "price": 10,
            "code": '71-0065',
            "type":"general"

          }

        ]

      },

      "eventInfo": {

        "_id": "5b1b6730e2a2d70004488083",

        "event_name": "Sonu nigam concert",

        "event_description": "description on event details",

        "start_date": "2018-04-24T00:00:00.000Z",

        "start_time": "12:29:20",

        "end_date": "2018-04-25T00:00:00.000Z",

        "end_time": "09:00:00",

        "venue": "5b041269ed15a90004e17cce",

        "event_category": "Music",

        "user": {"id":"5af1bcacb552510004fe71a2", "name": "Ben Shapiro", "phone":"+44 123 456 7890"},

        "status": "Draft",

        "event_image": "assets/images/free.png",

        "__v": 0

      }

    },

    {

      "bookingInfo": {

        "_id": "5b1b6acee2a2d70004488088",

        "bookingid": "1006",

        "eventid": "5b1b6730e2a2d70004488083",

        "bookedby": "5af0371c0b0fee00041435ba",

        "bookingdate": "2018-04-24T00:00:00.000Z",

        "status": "Booked",

        "__v": 0,

        "tickets": [

          {

            "ticketid": "5af290463ccd550004017dc6",

            "quantity": 2,
            "price": 10,
            "code": '71-0065',
            "type":"general"

          }

        ]

      },

      "eventInfo": {

        "_id": "5b1b6730e2a2d70004488083",

        "event_name": "Sonu nigam concert",

        "event_description": "description on event details",

        "start_date": "2018-04-24T00:00:00.000Z",

        "start_time": "12:29:20",

        "end_date": "2018-04-25T00:00:00.000Z",

        "end_time": "09:00:00",

        "venue": "5b041269ed15a90004e17cce",

        "event_category": "Music",

        "user": {"id":"5af1bcacb552510004fe71a2", "name": "Ben Shapiro", "phone":"+44 123 456 7890"},

        "status": "Draft",

        "event_image": "assets/images/free.png",

        "__v": 0

      }

    }

  ]
  constructor(private mainService: MainService, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.bookings)
  }
  selectBooking(booking){
    this.selectedBooking=booking;
  }
  close(){
    this.selectedBooking=undefined;
  }
  ngOnInit() {
    this.mainService.getOrders(this.user._id).subscribe(r => {
      console.log(r)
    }, e => {
      console.log(e)
    })
  }

}
