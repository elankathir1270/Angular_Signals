import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  cartItems = this.cartService.cartItems;
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;
  discount = this.cartService.discount;
  finalPrice = this.cartService.finalPrice;

  constructor(private cartService: CartService) {}

  addProduct() {
    this.cartService.addItem({
      id: 1,
      name: 'Laptop',
      price: 500,
      quantity: 1
    });
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  updateQty(id: number, qty: number) {
    this.cartService.updateItemQuantity(id, qty);
  }

  clear() {
    this.cartService.clearCart();
  }

}
