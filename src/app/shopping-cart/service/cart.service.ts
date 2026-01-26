import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import { CartItem } from '../model/cart-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //state
    private _cartItems = signal<CartItem[]>([]);// signal is generic type

  // expose as readonly (BEST PRACTICE)
  cartItems = this._cartItems.asReadonly();


  //derived state
  totalItems = computed(() => {
    return this._cartItems().reduce((total, item) => total + item.quantity,0)
  })

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity),0)
  })

  discount = computed(() => {
    return this.totalPrice() > 1000 ? 10 : 0; // 10% discount for orders above 1000
  })

  finalPrice = computed(() => {
    return this.totalPrice() - (this.totalPrice()* this.discount()) / 100;
  })

  constructor() {
    //effect to monitor cart changes and perform side effects
      effect(() => {
      const cart = this._cartItems();
      //purpose of untracked is to avoid infinite loop if inside effect we are updating any signal
      untracked(() => {
        console.log('Cart updated:', cart);
        // Real world: API sync
        // this.http.post('/api/cart', cart)
      });
    });
  }

  //actions

  addItem(item: CartItem) {
    const existingItem = this._cartItems().find(ci => ci.id === item.id);
    if(existingItem) {
      this._cartItems.update(items => {
        return items.map(ci => ci.id === item.id ? {...ci, quantity: ci.quantity + 1} : ci)
      })
    }else{
      this._cartItems.update(items => [...items,{...item, quantity: 1}]);
    }
}

removeItem(itemId: number) {
  this._cartItems.update(items => items.filter(ci => ci.id !== itemId));
}

updateItemQuantity(itemId: number, quantity: number) {
  this._cartItems.update(items => {
    return items.map(ci => ci.id === itemId ? {...ci, quantity: quantity} : ci)
  })
}

  clearCart() {
    this._cartItems.set([]);
  }
}
