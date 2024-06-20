import { Cinema } from "./cinema.model";
import { ShowTime } from "./showTimes.model";

export class Movie {
  id : number;
  name : string;
  showTimes : ShowTime[];
  cinema : Cinema;
  imageName : String;


    constructor(id : number, name: string, showTimes : ShowTime [], cinema: Cinema, imageName : String){
        this.id=id;
        this.name=name;
        this.showTimes=showTimes;
        this.cinema = cinema;
        this.imageName=imageName;
 
    }
}