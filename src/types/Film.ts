import { Character } from "./Character";
import { Specie } from "./Specie";
import { Planet } from "./Planet";

export interface Film {
  director: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: Date;
  title: string;
  id: number;
  characters: Character[];
  species: Specie[];
  planets: Planet[];
}
