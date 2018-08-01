import { Component, OnInit } from '@angular/core'
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user: any;
  data: any;
  draftEvents: number = 0;
  upcomingEvents: number = 0;
  published: number = 0;
  upcoming: any;
  publishedArr: any= [];
  constructor(private service: MainService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getStatistics();
  }
  getStatistics(){
    this.service.getDashboardDetails(this.user._id)
    .subscribe( res =>{
      console.log(res)
      this.data = res.result[0];
      let arr = res.result[0].events;
      for( let i of arr){
        if(i.status === 'Draft'){
          this.draftEvents++;
        }
        else if (i.status === 'Published'){
          this.published++;
          this.publishedArr.push(i);
        }
        else if (i.status === 'Upcoming') {
          this.upcomingEvents++;
        }
      }
      this.nextEvent();
    });
  }
  comp(a, b) {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  }
  nextEvent(){
    this.publishedArr.sort(this.comp)
    console.log(this.publishedArr)
    this.upcoming = this.publishedArr[0];
  }

}
