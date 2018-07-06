import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PaymentsDialogComponent } from './payments-dialog/payments-dialog.component';

@Component({
  selector: 'app-payemnts',
  templateUrl: './payemnts.component.html',
  styleUrls: ['./payemnts.component.less']
})
export class PayemntsComponent implements OnInit {
  bsModalref:BsModalRef;
  constructor(private mainService:MainService,
              private modalService:BsModalService) { }

  ngOnInit() {
  }
  transferAmount(){
    this.bsModalref = this.modalService.show(PaymentsDialogComponent);
    this.bsModalref.content.closeBtnName = 'Close';
  }
}
