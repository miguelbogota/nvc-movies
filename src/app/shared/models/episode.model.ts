/**
 * Model for an episode of a series / show from the API.
 */
export interface EpisodeInterface {
  air_date: Date,
  crew: {
    id: number,
    credit_id: string,
    name: string,
    department: string,
    job: string,
    gender: number,
    profile_path: string
  }[],
  guest_stars: {
    id: number,
    name: string,
    credit_id: string,
    character: string,
    order: number,
    gender: number,
    profile_path: string
  }[],
  name: string,
  overview: string,
  id: number,
  production_code: number,
  season_number: number,
  episode_number: string;
  still_path: string,
  vote_average: number,
  vote_count: number
}
