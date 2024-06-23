import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabet'
})
export class AlphabetPipe implements PipeTransform {

  transform(number: number): string {
    return String.fromCharCode(64 + number)
  }

}
