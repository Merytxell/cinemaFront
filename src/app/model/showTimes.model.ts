
export class ShowTime {
    id : number;
    hour: string;
    price : number;
    quantity: number;
    movie: any;
  
  
  
      constructor(id : number, hour: string, price : number, quantity : number){
          this.id=id;
          this.hour=hour;
          this.price=price;
          this.quantity=quantity;
   
      }
  }