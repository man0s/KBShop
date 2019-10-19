import {Pipe, PipeTransform} from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: "sort"
})
export class SortPipe  implements PipeTransform {
    transform(products: Product[], sortBool: Boolean): Product[] {
      products = products || [];  // set records to an empty array if undefined
      if(sortBool) {
        products.sort((a: Product, b: Product) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        products.sort((a: Product, b: Product) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return products;
    }
}
