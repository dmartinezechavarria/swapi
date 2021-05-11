import { Character } from "./Character";
import { Film } from "./Film";

export interface Planet {
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  orbital_period: string;
  rotation_period: string;
  population: string;
  surface_water: string;
  terrain: string;
  id: number;
  residents: Character[];
  films: Film[];
}
