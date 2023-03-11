import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalChange'
})
export class vocalChangePipe implements PipeTransform {

  transform(value: string): string {

    return  value.toLowerCase()
            .split('')
            .map((value) => {
              switch (value) {
                case 'a':
                  return '4'
                case 'e':
                  return '3'
                case 'i':
                  return '1'
                case 'o':
                  return '0'
                case 'u':
                  return '9'
                default:
                  return value
              }
            })
            .join('')
    ;
  }

}
