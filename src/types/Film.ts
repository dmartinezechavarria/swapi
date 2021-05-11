import { Character } from "./Character";

export interface Film {
  director: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: Date;
  title: string;
  id: number;
  characters: Character[];
}