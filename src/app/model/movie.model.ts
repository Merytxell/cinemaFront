import { ShowTime } from "./showTimes.model";

export class Movie {
  id : number;
  name : string;
  showTimes : ShowTime[];



    constructor(id : number, name: string, showTimes : ShowTime []){
        this.id=id;
        this.name=name;
        this.showTimes=showTimes;
 
    }
}