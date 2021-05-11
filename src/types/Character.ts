import { Specie } from "./Specie";
import { Film } from "./Film";
import { Planet } from "./Planet";

export interface Character {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: Date;
  eye_color: string;
  birth_year: string;
  gender: string;
  id: number;
  species: Specie[];
  films: Film[];
  homeworld: Planet;
}
