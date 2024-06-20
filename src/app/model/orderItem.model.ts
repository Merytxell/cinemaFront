
import { Order } from "./order.model";
import { ShowTime } from "./showTimes.model";

export class OrderItem {
    id : number;
   price : number;
   quantity : number;
    showTimes : ShowTime | undefined
   order : Order | undefined;


    constructor(id : number, price : number, quantity : number, order : Order, showTimes : ShowTime){
        this.id = id;
        this.price= price;
        this.quantity=quantity;
        this.order=order;
        this.showTimes=showTimes;
        
    }
}