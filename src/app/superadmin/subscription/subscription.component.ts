import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn,AbstractControl } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { SuperadminService } from '../../shared/services/superadmin.service';
import { planTypes , Currencies } from "../../shared/services/defaults";
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../shared/services/main.service';
import { Observable } from "rxjs/Observable";
import { Observer } from 'rxjs/Observer';
import "rxjs/Rx"

function numberValidn(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== undefined && isNaN(c.value)) {
      return { num: true }
    };
    return null;
  }
}
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less']
})
export class SubscriptionComponent implements OnInit {
  public subscribeForm: FormGroup;
  planType:any = planTypes;
  currencies: any = Currencies;
  planId:string;
  planData:any;
  color: string = "#127bdc";
  selectedFakeUrl:any;
  selectedFile:any;
  reader = new FileReader()
  secure_url;
  uploading;
  constructor(private fb: FormBuilder,
              private adminService:SuperadminService,
              private route:ActivatedRoute,
              private router: Router,
              private mainService: MainService) { }

  ngOnInit() {
    this.buildFormGroup();
    if(this.route.snapshot.params.id){
      console.log(this.route.snapshot.params)
      this.planId = this.route.snapshot.params.id;
      this.getPlan(this.planId)
      
    }
  }
  fileChange(event) {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
    this.reader.onload = (event: any) => {
      this.selectedFakeUrl = event.target.result;
    }

    this.reader.readAsDataURL(this.selectedFile);
    console.log(this.selectedFile, this.selectedFakeUrl)
  }
  async fileDragged(event) {
    this.selectedFile = event[0]
    this.reader.onload = (event: any) => {
      this.selectedFakeUrl = event.target.result;
    }

    this.reader.readAsDataURL(this.selectedFile);
    console.log(this.selectedFile, this.selectedFakeUrl)
  }
  buildFormGroup(){
    this.subscribeForm = this.fb.group({
      image_icon: [''],
      subscription_plan: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', [Validators.required,numberValidn()]],
      no_of_events:['', [Validators.required,numberValidn()]],
      no_of_tickets:['',[Validators.required,numberValidn()]],
      booking_fee:['',[Validators.required,numberValidn()]],
      color_scheme:['',Validators.required],
    })
    }
    onSubmit(){
      console.log("post")
      if (!!this.selectedFile == true) {
        this.mainService.uploadCloud(this.selectedFile).subscribe(r => {
          console.log(r.secure_url)
          this.subscribeForm.value.image_icon = r.secure_url;
          this.uploading = false;
          this.adminService.postSubscription(this.subscribeForm.value)
            .subscribe(result => {
              console.log(result)
            });
          this.router.navigate(['/superadmin', 'subscription'])
        },
          e => {
            this.uploading = false
          })
      } else if (this.selectedFakeUrl) {
        console.log("here")
        this.uploading = false
        this.subscribeForm.value.image_icon = this.selectedFakeUrl
      }
    }

    onSubmitPut(){
      console.log("put")
      if (!!this.selectedFile == true) {
        this.mainService.uploadCloud(this.selectedFile).subscribe(r => {
          console.log(r.secure_url)
          this.subscribeForm.value.image_icon = r.secure_url;
          this.uploading = false;
          this.adminService.updateSubscription(this.planId, this.subscribeForm.value)
            .subscribe(res => {
              console.log(res)
            })
          this.router.navigate(['/superadmin', 'subscription'])
        },
          e => {
            this.uploading = false
          })
      } else if (this.selectedFakeUrl) {
        console.log("here")
        this.uploading = false
        this.subscribeForm.value.image_icon = this.selectedFakeUrl
      }
    }
    getPlan(id:string){
      this.adminService.getSubscription(this.planId)
        .subscribe(res => {
          this.planData = res.subplan;
          this.patchFormValue(this.planData);
        })
    }
    patchFormValue(data){
      this.subscribeForm.patchValue({
        image_icon: this.planData.image_icon,
        subscription_plan: this.planData.subscription_plan,
        currency: this.planData.currency,
        amount: this.planData.amount,
        no_of_events: this.planData.no_of_events === "Unlimited" ? 0 : this.planData.no_of_events,
        no_of_tickets: this.planData.no_of_tickets === "Unlimited" ? 0 : this.planData.no_of_tickets,
        booking_fee: this.planData.booking_fee,
        color_scheme: this.planData.color_scheme
      })
    }

        
  }
