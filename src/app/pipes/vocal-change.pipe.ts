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
                break
                case 'e':
                  return '3'
                break
                case 'i':
                  return '1'
                break
                case 'o':
                  return '0'
                break
                case 'u':
                  return '9'
                break
                default:
                  return value
              }
            })
            .join('')
    ;
  }

}
