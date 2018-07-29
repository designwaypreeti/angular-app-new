import { Component, OnInit } from '@angular/core'
import { MainService } from '../shared/services/main.service'
import { ToastrService } from 'ngx-toastr'
/* This is a parent level component which has child components.
   Parent controls the main profile data flowing to the children */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  tab: number
  shown: boolean
  user: any
  oldPass
  newPass
  changePass = false
  cards = []
  subs = []
  banks = []
  subsArr = [];
  constructor(private mainService: MainService, private toastr: ToastrService) {
    this.tab = 1
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.mainService.getProfile(this.user._id).subscribe(
      r => {
        if (!!r.user) {
          this.fetchPlans(r.user)
          console.log(r)
          this.user = r.user
          this.loadBanks(r.user.bankaccounts)
        }
      }
      , e => {
        console.log(e)
      })
  }
  fetchPlans(user) {
    this.mainService.getSubscriptions().subscribe(r => {
      const subscList = r.list.map(e => {
        let temp = {
          id: undefined,
          type: 'free',
          price: '0',
          events: null,
          tickets: null,
          booking: '40c',
          src: '/assets/images/free.png',
          selected: false,
          color_scheme: '#27C2FF'
        }
        temp.id = e._id
        temp.type = e.subscription_plan || 'free'
        temp.price = (e.amount === 0 || e.amount == undefined)
          ? null
          : e.amount
        temp.events = (e.no_of_events === 0 || e.no_of_events == undefined)
          ? null
          : e.no_of_events
        temp.tickets = (e.no_of_tickets === 0 || e.no_of_tickets == undefined)
          ? null
          : e.no_of_tickets
        temp.booking = e.booking_fee;
        temp.src = e.icon || '/assets/images/free.png';
        temp.selected = (e._id == user.subscription) ? true : false;
        temp.color_scheme = e.color_scheme || '#000';
        this.subsArr.push(temp)
        this.subsArr.reverse();
      })

      for (let i = 0; i < 4; i++) {
        this.subs[i] = this.subsArr[i];
      }
      console.log(this.subs)
    }, err => { })

  }

  selectPlan(plan) {
    this.mainService.userSubscribe(plan.id, this.user._id).subscribe(
      r => {
        this.subs.map(p => {
          p.selected = (p === plan) ? !p.selected : false
        })
      }
      , e => {
        console.log(e)
        this.toastr.error('Couldnt Subscribe to the plan', '', {
          timeOut: 3000,
        })
      })

  }
  loadBanks(banks) {
    banks.map(bank => {
      const sub = bank.accountno.substr(bank.accountno.length - 4)
      this.banks.push({
        id: bank._id,
        number: `xxx xxx xxx ${sub}`
      })
    })
  }
  submitGeneral(f) {
    if (f.pristine) {
      return
    }
    const user = {
      name: f.value.name,
      email: f.value.email,
      address:f.value.address,
      mobile:f.value.mobile,
      oldpassword: f.value.oldpassword ? f.value.oldpassword : undefined,
      newpassword: f.value.newpassword ? f.value.newpassword : undefined

    }
    this.mainService.updateProfile(user, this.user._id).subscribe(
      r => {
        console.log(r)
        this.user = r.result
        this.toastr.success('User Details Updated', '', {
          timeOut: 3000,
        })
      }
      , e => {
        console.log(e)
        this.toastr.error('Couldnt Update User', '', {
          timeOut: 3000,
        })
      })
  }
  changeTab(n) {
    this.tab = n
  }
  showModal() {
    console.log(1)
    this.shown = true
  }
  cardAdded(res) {
    const card = {
      number: `xxxx xxxx xxxx ${res.data.number4}`,
      month: res.data.month,
      year: res.data.year
    }
    this.cards.push(card)
  }
  bankAdded(res) {
    const sub = res.data.number.substr(res.data.number.length - 4)
    const bank = {
      number: `xxxx xxxx xxxx ${sub}`,
      id: res.data._id
    }
    this.banks.push(bank)
  }

  // deleteing bank and removing it from the main bank list
  deleteBank(e) {
    this.mainService.deleteBank(this.user._id,e.bank.id).subscribe(
      r => {
        console.log(r)
        // this.user = r.result
        this.banks = this.banks.filter(bank => {
          return (bank != e.bank) ? true : false
        })
        this.toastr.success('Bank Deleted', '', {
          timeOut: 3000,
        })
      }
      , e => {
        console.log(e)
        this.toastr.error('Couldnt Delete Bank', '', {
          timeOut: 3000,
        })
      })

  }
  hideModal(data) {
    if (data.shown === false) {
      this.shown = false
    }
  }

}
