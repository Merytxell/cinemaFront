import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Cinema } from 'src/app/model/cinema.model';
import { Movie } from 'src/app/model/movie.model';
import { environment } from 'src/environments/environment';
import { ShowTime } from 'src/app/model/showTimes.model';
import { CartService } from 'src/app/services/cart.service';

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
  listShow : ShowTime [] = [];
  error: any;
  URLStr: string = '';
  selectedIdMovie: number | null = null;

  

  constructor(private apiService: ApiService, private router: Router, private cartService :CartService) {}

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


  /**
   * list of all cinema
   */
  getAllCinemas() {
    this.apiService.getCinema().subscribe({
      next: (data) => this.listCinemas = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }


  /**
   * 
   * @param cinema all movie by cinema
   */
  getAllMovieByCinema(cinema: Cinema) {
    this.apiService.getMovieByCinema(cinema.id).subscribe({
      next: (data) => this.listMovies = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }

  /**
   * 
   * @param keyword search cinema
   */
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
/**
 * 
 * @param movie 
 */

  getAllShowByMovie(movie : Movie){

    this.selectedIdMovie = movie.id;
    this.apiService.getShowByMovie(movie.id).subscribe({
      next: (showtimes) => {
        movie.showTimes= showtimes;
     
      },
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    });
  }

  addToCart(showTime: ShowTime) { 
    this.cartService.addShowTime(showTime);
    alert('Séance ajoutée au panier !'); 
  }
}

