import { Customer } from "./customer.model";


export class Order {
    id : number;
   date : Date;
   totalAmount: number;
   customer : Customer;




    constructor(id : number, date : Date, totalAmount: number,  customer : Customer){
        this.id = id;
        this.date = date;
        this.totalAmount= totalAmount;
        this.customer=customer;
    }
}