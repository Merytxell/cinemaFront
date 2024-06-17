import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/movie.model';
import { Cinema } from '../model/cinema.model';
import { showTimes } from '../model/showTimes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public getMovie(){
    return this.http.get<Movie[]>(environment.host+"/movies");
  }

  public getCinema(){
    return this.http.get<Cinema[]>(environment.host+"/cinemas");
  }

  public getMovieByCinema(id : number) {
    return this.http.get<Movie[]>(environment.host+"/movies/cinemas/" + id);
  }
  public getShowTime (){
    return this.http.get<showTimes[]>(environment.host+"/showTimes");
  }

  public getShowByMovie(id : number){
    return this.http.get<showTimes[]>(environment.host+"/showTimes/movies/" + id);
  }

  public searchCinemas (keyword : string) {
    return this.http.get<Cinema[]>(environment.host+"/cinemas/search/" + keyword);
  }
}
