import { Directive, HostBinding, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCleanInput]'
})
export class CleanInputDirective {
  @Input() ngModel: string;
  @Output() ngModelChange = new EventEmitter();
  constructor(private el: ElementRef) {
  }
  @HostListener('blur',['$event.type', '$event.target.value'] )
  onInput( event: string, value: string ): void {
    // this.updateValue( event, value );
    if(value ){
          this.ngModel = 
          this.ngModel.trim()
          if(!this.ngModel)  this.ngModel = undefined
        }
     console.log(event , value,this.ngModel)   
     this.ngModelChange.emit(this.ngModel); 
}
}
