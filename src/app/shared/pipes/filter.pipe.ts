import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, args?: any): any  {
    // console.log(items) 
    // console.log(args) 
    if (args instanceof Array){
      if (args[0] == 'All') {
        args = '';
      }else{
        args = args[0];
      }
    }
    var flag = false;
    if(!items){
      return true;
    }
   
      return items.filter(item => {
        for (let key in item.bookingInfo) {
          // console.log(item.bookingInfo[key])
          // console.log(args)
          args= args.toLowerCase();
          if (((item.bookingInfo[key].toString()).toLowerCase()).indexOf(args) > -1) {
            console.log("true")
            flag = true;
            return true;
          }

          if (item.bookingInfo[key]== args) {
            
            // return item.bookingInfo[key];
          }
          // console.log(args) 
          ///item.bookingInfo[key];
          // return true;
          // return items.filter(e => e[args].toLowerCase().indexOf(item.bookingInfo) > -1);

        }
        
      }
      );
    }

  

}
