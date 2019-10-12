export class Product {
  id: string;
  title: string;
  image: string;
  price: number;

  public updateFrom(product: Product): void {
    this.id = product.id;
    this.title = product.title;
    this.image = product.image;
    this.price = product.price;
  }
}

