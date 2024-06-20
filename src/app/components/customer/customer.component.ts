import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm : FormGroup;
  customer : Customer;
  error : string | undefined;
  currentStep!: number;

  constructor(public cartService : CartService, private router : Router, private formbuilder : FormBuilder) { 
    this.customer = this.cartService.getCustomer();
    this.customerForm = this.formbuilder.group({
      name : [this.customer.name, Validators.required],
      firstName : [this.customer.firstName, Validators.required],
      address : [this.customer.address, [Validators.required, Validators.minLength(25)]],
      phone : [this.customer.phone, [Validators.required, Validators.maxLength(10)]],
      email : [this.customer.email, [Validators.required, Validators.pattern(environment.regExEmail)]]
    });
  }


  ngOnInit(): void {
  }

  onSaveCustomer(form : FormGroup){
    if(form.valid){
      this.cartService.saveCustomer(new Customer(0, form.value.name, form.value.firstName, form.value.address, form.value.phone, form.value.email));
      this.router.navigateByUrl('order');
    }else{
      this.error = "vous n'avez pas saisi correctement les champs";
    }
  }

}
