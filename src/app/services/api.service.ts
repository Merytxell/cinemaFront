import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/movie.model';
import { Cinema } from '../model/cinema.model';
import { ShowTime } from '../model/showTimes.model';
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
    return this.http.get<ShowTime[]>(environment.host+"/showTimes");
  }

  public getShowByMovie(id : number){
    return this.http.get<ShowTime[]>(environment.host+"/showTimes/movies/" + id);
  }

  public searchCinemas (keyword : string) {
    return this.http.get<Cinema[]>(environment.host+"/cinemas/search/" + keyword);
  }

  /**
   * Requête permettant la connexion user par JWT
   * @param username rentré apar l'user
   * @param password rentré par l'user
   * @returns un observable de type HttpResponse
   *  
   */
  public getLoginByUsernamePassword(username : string, password : string){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded'
    })
    const body = new HttpParams()
            .set('username', username)
            .set('password', password);
    return this.http.post<any>(environment.auth + "/login", body, {headers, observe : 'response'});
  }
}
