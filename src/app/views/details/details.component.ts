import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { TVInterface } from 'src/app/shared/models/tv.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  showId: number;
  show: TVInterface;

  tvSubscription: Subscription;
  seasonDisplay: number;
  image: string;
  noImage = 'assets/images/no-image.jpg';
  showOverview = false;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      // Get parameters
      this.showId = parseInt(params.get('showId'));
      this.seasonDisplay = parseInt(params.get('seasonNumber'));
    });
  }

  public ngOnInit(): void {
    this.tvSubscription = this.movieService.get<TVInterface>(this.showId).subscribe(serie => {
      this.show = serie; // Save show to display
      this.image = this.show.poster_path ? this.movieService.setImage(this.show.poster_path, 400) : this.noImage;
      // Asign the first season to display
      this.show.seasons.forEach(season => {
        if (!this.seasonDisplay) { this.seasonDisplay = season.season_number; }
      });
    });
  }

  public toggleOverview(): void {
    this.showOverview = !this.showOverview;
  }

  public ngOnDestroy(): void {
    this.tvSubscription.unsubscribe();
  }

}
