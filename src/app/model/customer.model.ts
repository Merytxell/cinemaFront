export class Customer {
    id : number;
    name : string;
    firstName : string;
    address : string;
    phone : string;
    email : string;

    constructor(id : number, name : string,firstName : string, address : string,phone : string, email:string){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}