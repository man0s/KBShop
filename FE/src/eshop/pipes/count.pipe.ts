import {Pipe, PipeTransform} from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: "count"
})
export class CountPipe  implements PipeTransform {
  transform(products: Product[], countNum: number, countBool: Boolean): Product[] {
    products = products || [];  // set records to an empty array if undefined
    if(countBool) {
      products.slice(0, countNum);

    } else {
      products.slice();
    }
    return products;
  }
}
