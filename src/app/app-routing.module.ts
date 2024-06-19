import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './components/cinema/cinema.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'cinema', component: CinemaComponent },
  { path: '', redirectTo: '/cinema', pathMatch: 'full' },
  { path : 'login' , component : LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
