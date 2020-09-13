import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { TVInterface } from 'src/app/shared/models/tv.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy {

  trendingShows: TVInterface[];
  discoverShows: TVInterface[];
  trendingSubscription: Subscription;
  discoverSubscription: Subscription;
  isLoadingTrending = true;
  isLoadingDiscover = true;

  page = 1;
  isLoadingMore = false;

  constructor(
    private movieService: MovieService
  ) { }

  public ngOnInit(): void {
    // Save subscription to unsubsribe later
    this.trendingSubscription = this.movieService.trending()
      .subscribe(u => {
        // Save trending shows
        this.trendingShows = u.results;
        this.isLoadingTrending = false;
      });
    // Save subscription to unsubsribe later
    this.discoverSubscription = this.movieService.discover(this.page)
      .subscribe(u => {
        // Save discover shows
        this.discoverShows = u.results;
        this.isLoadingDiscover = false;
      });
  }

  public ngOnDestroy(): void {
    // Unsubscribe from the movies service
    this.trendingSubscription.unsubscribe();
    this.discoverSubscription.unsubscribe();
  }

  public getMoreShows() {
    this.discoverSubscription.unsubscribe();
    this.isLoadingMore = true;
    this.page += 1;
    // Save subscription to unsubsribe later and subcribe to new page
    this.discoverSubscription = this.movieService.discover(this.page)
      .subscribe(u => {
        // Save new discover shows
        this.discoverShows = [...this.discoverShows, ...u.results];
        this.isLoadingMore = false;
      });
  }

}
