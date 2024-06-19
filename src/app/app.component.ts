import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinemaFront';
  isUserLoggedIn = false;
  username: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    this.isUserLoggedIn = this.authService.isConnected();
    if (this.isUserLoggedIn) {
      this.username = this.authService.getUsername();
    } else {
      this.username = null;
    }
  }

  logout() {
    this.authService.disconnected();
    this.isUserLoggedIn = false;
    this.username = null;
  }
}
