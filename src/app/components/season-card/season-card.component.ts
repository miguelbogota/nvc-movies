import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { SeasonInterface } from 'src/app/shared/models/season.model';

@Component({
  selector: 'app-season-card',
  templateUrl: './season-card.component.html',
  styleUrls: ['./season-card.component.scss']
})
export class SeasonCardComponent implements OnInit, OnDestroy {

  showId: number;
  seasonNumber: number;
  seasonToShow: SeasonInterface;
  seasonSubscription: Subscription;
  isLoading = true;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.isLoading = true;
      // Get parameters
      this.seasonNumber = parseInt(params.get('seasonNumber'));
      this.showId = parseInt(params.get('showId'));
      // Unsubcribe
      if (this.seasonSubscription) { this.seasonSubscription.unsubscribe(); }
      // Look for the data in API
      this.seasonSubscription = this.movieService.get<SeasonInterface>(this.showId, this.seasonNumber)
        .subscribe(s => {
          this.seasonToShow = s; // Save season
          this.isLoading = false;
        });
    });
  }

  public ngOnDestroy(): void {
    this.seasonSubscription.unsubscribe();
  }

}
