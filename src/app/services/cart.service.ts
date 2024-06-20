import { Injectable } from '@angular/core';
import { ShowTime } from '../model/showTimes.model';
import { Customer } from '../model/customer.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart : Map<number, ShowTime> = new Map<number, ShowTime>();

  constructor() {
    this.loadCart();
   }

   private loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = new Map<number, ShowTime>(JSON.parse(cart));
   
   
    }
   }

   addShowTime(showTime: ShowTime) {
    if (this.cart.has(showTime.id)) {
      const existShow = this.cart.get(showTime.id);
      if (existShow && existShow.quantity < 10) {
        existShow.quantity++;
      }
    } else {
      showTime.quantity = 1; 
      this.cart.set(showTime.id, showTime);
    }
    this.saveCart();
  }
  removeShowTime(showTime: ShowTime) {
    if (this.cart.has(showTime.id)) {
      const existShow = this.cart.get(showTime.id);
      if (existShow && existShow.quantity > 1) {
        existShow.quantity--;
      } else {
        this.cart.delete(showTime.id);
      }
      this.saveCart();
    }
  }


  saveCart() {
    localStorage.setItem('cart', JSON.stringify([...this.cart]));
  }

  clearCart() {
    this.cart.clear();
    this.saveCart();
  }

  clearLocalStorage(){
    this.cart.clear();
    localStorage.setItem('cart', '');
  }
  getCart(): Map<number, ShowTime> {
    return this.cart;
  }

  saveCustomer(customer : Customer){
    localStorage.setItem('customer', JSON.stringify(customer));
    
  }

  getCustomer() : Customer{
    let customer = localStorage.getItem('customer');
    if(customer) return JSON.parse(customer);
    return new Customer(0, "unknown", "unknown", "unknown", "unknown", "unknown");
  }

  
  setOrder(order : Order) {
    localStorage.setItem('order', JSON.stringify(order));
  }

  getOrder(): Order {
    let order = localStorage.getItem('order');
    if (order) return JSON.parse(order);
    return new Order (0,new Date, 0, this.getCustomer());
  }
  getTotalPrice(): number {
    let totalPrice = 0;
    for (let showTime of this.cart.values()) {
      totalPrice += showTime.price * showTime.quantity;
    }
    return totalPrice;
  }
}