import { Character } from "./Character";
import { Film } from "./Film";

export interface Specie {
  average_height: string;
  average_lifespan: number;
  classification: string;
  designation: string;
  eye_colors: Date;
  hair_colors: string;
  language: string;
  name: string;
  skin_colors: string;
  id: number;
  people: Character[];
  films: Film[];
}
