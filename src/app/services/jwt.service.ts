import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwtToken!: string;
  decodedToken!: { [key: string]: string; };


  constructor() {}

  setToken(token : string){
    if(token) this.jwtToken = token;
  }

  decodeToken(){
    if(this.jwtToken) this.decodedToken = jwtDecode(this.jwtToken);
    else this.decodedToken = {};
  }

  getDecodeToken(){
    return jwtDecode(this.jwtToken);
  }
  getUsername(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  getUserRole(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['roles'] : null;
  }

  getExpirytime(){
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(){
    const expiryTime = this.getExpirytime();
    if(expiryTime){
      return ((1000 * parseInt(expiryTime)) - (new Date()).getTime()) < 5000;
    } else return false;

  }
  clearToken(){
    this.jwtToken = "";
    this.decodedToken = {};
  }
}
