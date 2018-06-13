import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {
  question:any;
  answer:boolean = false;
  constructor(public dialog: MatDialog,
    public dialogref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { ques: any, ans:boolean }) { }

  ngOnInit() {
    this.question = this.data.ques;
  }
close(flag:boolean){
  this.dialogref.close(flag);
}
  // openDialog(): void {
  //   let dialogRef = this.dialog.open(DialogComponent, {
  //     width: '250px',
  //     data: { question:this.question , answer:this.answer }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.answer = result;
  //   });
  // }

 
  
}
