import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { EpisodeInterface } from 'src/app/shared/models/episode.model';
import { TVInterface } from 'src/app/shared/models/tv.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() show: TVInterface;

  rate: number = 0;
  actors = [];
  image: string;
  noImage = 'assets/images/no-image.jpg';

  constructor(
    public movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.rate = this.show.vote_average; // Bind for the rates
    this.image = this.show.poster_path ? this.movieService.setImage(this.show.poster_path, 300) : this.noImage;
    // Call the episodes where the actors are
    this.movieService.get<EpisodeInterface>(this.show.id, 1, 1).subscribe(u => {
      // Get the first 3 actors
      this.actors = u.guest_stars.slice(0, 3);
      // If there's not any actors add one to show 'Actors unavaliable'
      if (this.actors.length === 0) {
        this.actors.push({
          name: 'Actors unavailable'
        });
      }
    }, err => { });
  }

}
