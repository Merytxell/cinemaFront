import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  
  order! : Order;

  constructor(private router : Router, private cartService : CartService) { }

  ngOnInit(): void {
    this.order= this.cartService.getOrder();
  }

  onPayOrder()
	{
		if(confirm("Aujourd'hui c'est la fête de la musique c'est gratuit !"))
		{
			this.router.navigateByUrl('cinema');
		}
	}

}
