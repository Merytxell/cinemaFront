import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { Order } from 'src/app/model/order.model';
import { OrderItem } from 'src/app/model/orderItem.model';
import { ShowTime } from 'src/app/model/showTimes.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  dateOrder : Date = new Date();
  customer : Customer | undefined;
  


  constructor(public cartService : CartService, private router : Router, private apiService : ApiService) { }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
  }

  onOrder(){
    if(confirm("Confirmer la commande?")){
      this.saveOrder();
    }
  }

  saveOrder(){
    if (this.customer) {
      this.apiService.saveCustomer(this.customer).subscribe({
        next: (data) => {
          this.cartService.saveCustomer(data);
          this.apiService.getCustomer(data.id).subscribe({
            next: (customerSaved) => {
              const newOrder = new Order(0, new Date(), this.cartService.getTotalPrice(), customerSaved);
              this.apiService.saveOrder(newOrder).subscribe({
                next: (orderSaved) => {
                  this.cartService.setOrder(orderSaved);
                  this.cartService.getCart().forEach(showTime => {
                    const newOrderItem = new OrderItem(0, showTime.price, showTime.quantity, orderSaved, showTime);
                    this.apiService.saveOrderItem(newOrderItem).subscribe();
                  });
                  this.cartService.clearLocalStorage();
                  this.router.navigateByUrl('confirmOrder');
                }
              });
            }
          });
        }
      });
    }
  }
}
