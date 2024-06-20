import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './components/cinema/cinema.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: 'cinema', component: CinemaComponent },
  { path: '', redirectTo: '/cinema', pathMatch: 'full' },
  { path : 'login' , component : LoginComponent},
  { path : 'cart', component : CartComponent},
  { path : 'customer', component : CustomerComponent},
  { path : 'order', component : OrderComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
