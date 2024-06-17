import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Cinema } from 'src/app/model/cinema.model';
import { Movie } from 'src/app/model/movie.model';
import { environment } from 'src/environments/environment';
import { showTimes } from 'src/app/model/showTimes.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  listCinemas: Cinema[] = []; 
  keyword: string = '';
  cinemas: Cinema[] = [];
  listMovies: Movie[] = [];   
  listShow : showTimes [] = [];
  error: any;
  URLStr: string = '';
  selectedIdMovie: Movie | null = null;

  

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMovies();
    this.getAllCinemas();
    this.URLStr = environment.host;
  }

  /**
   * Fonction pour récupérer la liste des films depuis la BDD
   */
  getAllMovies() {
    this.apiService.getMovie().subscribe({
      next: (data) => {
        this.listMovies = data;
        this.listMovies.forEach(movie => this.getAllShowByMovie(movie));
      },
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }

  getAllCinemas() {
    this.apiService.getCinema().subscribe({
      next: (data) => this.listCinemas = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }

  getAllMovieByCinema(cinema: Cinema) {
    this.apiService.getMovieByCinema(cinema.id).subscribe({
      next: (data) => this.listMovies = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }
  searchCinemas(keyword: string): void {
    this.apiService.searchCinemas(keyword).subscribe(
      (data) => {
        this.listCinemas = data;
      },
      (error) => {
        console.error('ça marche pas', error);
      }
    );
  }


  getAllShowByMovie(movie : Movie){

    this.apiService.getShowByMovie(movie.id).subscribe({
      next:(data) => this.listShow = data,
      error : (err) => this.error = err.message,
      complete:() => this.error= null
    });
  }
}
