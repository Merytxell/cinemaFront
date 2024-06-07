import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] | undefined;

  constructor(private apiServive : ApiService) { }

  ngOnInit(): void {
    this.apiServive.getMovie().subscribe(data => {
      this.movies = data;
    });

  }

}
