import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userConnected : User = new User("","",[]);
  username : string = "";
  token : any;

  constructor(private apiService : ApiService, private jwtService : JwtService) {
    this.token = this.getToken();
   }

   
   login(username : string, password : string)  {
    return this.apiService.getLoginByUsernamePassword(username, password);
  }

  saveUser(user : User){
    localStorage.setItem('user', btoa(JSON.stringify(user)));
  }

  getUser() : User{
    let userData = localStorage.getItem('user');
    if(userData)
      return JSON.parse(atob(userData));
    else return new User("", "", []);
  }

  setUsername(username : string){
    localStorage.setItem('username', btoa(JSON.stringify(username)));
  }
isAdmin() : boolean{
    let role = this.getRoles();
    if(role && role?.length > 0){
      if(role.includes("ADMIN")) return true;
    }
    return false;
  }

  isUser(): boolean{
    let role = this.getRoles();
    if(role && role?.length > 0){
      if(role.includes("USER")) return true;
    }
    return false;
  }

  isConnected() {
    return this.getToken() != null; 
  }
  getToken(){
    return localStorage.getItem('access-token');
  }
  getUsername(){
    let username = localStorage.getItem('username');
    if(username) return this.username = JSON.parse(atob(username));
  }

  getRoles(){
    let roles = localStorage.getItem('roles');
    if(roles) return JSON.parse(atob(roles));
  }

  disconnected() {
    this.jwtService.clearToken();
    localStorage.removeItem('access-token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }
  
}
