import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DialogComponent } from "../../shared/dialog/dialog.component";


@Component({
  selector: 'app-profile-bank-details-card',
  templateUrl: './profile-bank-details-card.component.html',
  styleUrls: ['./profile-bank-details-card.component.less']
})
export class ProfileBankDetailsCardComponent implements OnInit {
  @Input() bank
  @Output() deleteBank = new EventEmitter<{ bank: any }>()
  selectedCard = ''
  cardOptions = [
    {
      value: 'delete',
      viewValue: 'Delete'
    },
  ];
  question: any = 'Do you want to delete the saved card?';
  answer: boolean = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.bank)
  }
  delete() {
    this.selectedCard = ''
    this.deleteBank.emit({ bank: this.bank }) 
  }
  onSelectedObjChanged(e){
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '170px',
      data: { ques: this.question, ans: this.answer }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.answer = result;
      if(result){
        this.delete()
      }
      console.log(this.answer);
    });
  }
}
