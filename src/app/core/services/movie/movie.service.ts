import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryInterface } from 'src/app/shared/models/query.model';
import { TVInterface } from 'src/app/shared/models/tv.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API = 'https://api.themoviedb.org/3';
  private API_KEY = 'b2907782d07859a652052d3bae537475';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Returns the trending shows of the week.
   */
  public trending(): Observable<QueryInterface<TVInterface>> {
    return this.http.get<QueryInterface<TVInterface>>(`${this.API}/trending/tv/week?api_key=${this.API_KEY}`);
  }

  /**
   * Return new tv shows.
   * @param page Page for the disocver results.
   */
  public discover(page: number): Observable<QueryInterface<TVInterface>> {
    return this.http.get<QueryInterface<TVInterface>>(`${this.API}/discover/tv?api_key=${this.API_KEY}&sort_by=popularity.desc&include_adult=false&page=${page}`);
  }

  /**
   * Returns a show / season / episode with the id.
   * @param id Id of the series / show / movie to look for.
   * @param season Season number if applies.
   * @param episode Episode if applies.
   */
  public get<T>(id: number, season?: number, episode?: number): Observable<T> {
    if (season === undefined && episode === undefined) {
      return this.http.get<T>(`${this.API}/tv/${id}?api_key=${this.API_KEY}`);
    }
    else if (season >= 0 && episode >= 0) {
      return this.http.get<T>(`${this.API}/tv/${id}/season/${season}/episode/${episode}?api_key=${this.API_KEY}`);
    }
    else if (season >= 0) {
      return this.http.get<T>(`${this.API}/tv/${id}/season/${season}?api_key=${this.API_KEY}`);
    }
  }

  /**
   * Returns a search result query.
   * @param query Query to look for.
   * @param page Pagination page numer.
   */
  public search(query: string, page?: number): Observable<QueryInterface<TVInterface>> {
    const pageReal = page ? `&page=${page}` : '';
    return this.http.get<QueryInterface<TVInterface>>(`${this.API}/search/tv?api_key=${this.API_KEY}&query=${query}${pageReal}`);
  }

  /**
   * Returns the link to get the image with size.
   * @param path Path for the image.
   * @param size Size the image needed.
   */
  public setImage(path: string, size: number): string {
    return `https://image.tmdb.org/t/p/w${size}${path}`;
  }

}
