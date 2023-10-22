import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/product.interface';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(products: Products[]): Products[] {
    return products.reverse();
  }

}
