import { Directive, HostListener, HostBinding, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})

export class DndDirective {
  @HostBinding('style.background') private background = '#fff';
  @Output() fileUploaded = new EventEmitter();
  constructor() { }
  
  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      //do some stuff here
    }
    this.background = '#eee';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    //do some stuff
    this.background = '#fff';
  }
  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    console.log(evt)
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      //do some stuff
      console.log(files)
      this.fileUploaded.emit(files);
    }
    this.background = '#fff'  }
}
