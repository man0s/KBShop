export class Product {
  title: string;
  image: string;
  price: number;
  quantity: number;

  constructor(title: string, image: string, price: number, quantity: number = 0) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
  }
}

