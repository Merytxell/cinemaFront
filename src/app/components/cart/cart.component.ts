import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { ShowTime } from 'src/app/model/showTimes.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  URLStr: string = '';
  cart: Map<number, ShowTime> = new Map<number, ShowTime>();


  constructor(private cartService: CartService, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.loadCart();
  }

 
  loadCart() {
    this.cart = this.cartService.getCart();
  }


  addShowTime(showTime: ShowTime) {
    this.cartService.addShowTime(showTime);
    this.loadCart(); 
  }

  
  removeShowTime(showTime: ShowTime) {
    this.cartService.removeShowTime(showTime);
    this.loadCart(); 
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart(); 
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let showTime of this.cart.values()) {
      totalPrice += showTime.price * showTime.quantity;
    }
    return totalPrice;
  }

  onNewOrder(){
    if (this.authService.isUser()) {
      this.router.navigateByUrl('/customer');
    } else {
      this.router.navigateByUrl('/login');
    }
  
}
}
