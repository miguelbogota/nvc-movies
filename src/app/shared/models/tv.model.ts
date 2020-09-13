import { SeasonInterface } from './season.model';

/**
 * Model for a serie / show from the API.
 */
export interface TVInterface {
  backdrop_path: string,
  created_by: {
    id: number,
    credit_id: string,
    name: string,
    gender: number,
    profile_path: string
  }[],
  episode_run_time: number[],
  first_air_date: Date,
  genres: {
    id: number,
    name: string
  }[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[],
  last_air_date: Date,
  last_episode_to_air: {
    air_date: Date,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    production_code: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number
  },
  name: string,
  next_episode_to_air: Date,
  networks: {
    name: string,
    id: number,
    logo_path: string,
    origin_country: string
  }[],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  seasons: SeasonInterface[],
  status: string,
  type: string,
  vote_average: number,
  vote_count: number
}
