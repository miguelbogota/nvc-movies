import { EpisodeInterface } from './episode.model';

/**
 * Model for a season of a series / show from the API.
 */
export interface SeasonInterface {
  _id?: string,
  air_date: Date,
  episodes: EpisodeInterface[],
  name: string,
  overview: string,
  id: number,
  poster_path: string,
  season_number: number
}
