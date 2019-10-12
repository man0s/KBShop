export class Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;

  constructor(id: number, title: string, image: string, price: number, quantity: number = 0) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
  }
}

