import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './components/cinema/cinema.component';

const routes: Routes = [
  { path: 'cinema', component: CinemaComponent },
  { path: '', redirectTo: '/cinema', pathMatch: 'full' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
