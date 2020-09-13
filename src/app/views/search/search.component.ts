import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { TVInterface } from 'src/app/shared/models/tv.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private query: string = null;

  searchResults: TVInterface[] = []
  searchSubscription: Subscription;
  isLoading = true;
  isLoadingMore = false;
  page = 1;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.activatedRoute.queryParams.subscribe(query => {
      this.isLoading = true;
      this.query = query.search_query.replace(/-/g, '+');
      if (this.searchSubscription) { this.searchSubscription.unsubscribe(); }
      // Save subscription to unsubsribe later and subcribe to new page
      this.searchSubscription = this.movieService.search(this.query, this.page)
        .subscribe(u => {
          // Save new searched shows
          this.searchResults = u.results;
          if (this.searchResults.length === 0) { this.errorMessage = 'No results found'; }
          else { this.errorMessage = null; }
          this.isLoading = false;
        });
    });
  }

  public ngOnInit(): void {
  }

  public getMoreShows() {
    this.searchSubscription.unsubscribe();
    this.isLoadingMore = true;
    this.page += 1;
    // Save subscription to unsubsribe later and subcribe to new page
    this.searchSubscription = this.movieService.search(this.query, this.page)
      .subscribe(u => {
        // Save new searched shows
        this.searchResults = [...this.searchResults, ...u.results];
        this.isLoadingMore = false;
      });
  }

}
