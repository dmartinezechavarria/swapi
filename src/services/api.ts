import { Film } from "@/types/Film";
import { Character } from "@/types/Character";
import { Specie } from "@/types/Specie";

const API_URL = "https://swapi.dev/api";
const options = {
  method: "get",
  headers: {
    "content-type": "application/json",
  },
};

export const api = {
  getFilms(
    page = 1,
    relationships = false
  ): Promise<{ films: Film[]; total: number }> {
    return fetchData(`${API_URL}/films/?page=${page}`, (json) => {
      return Promise.all(
        json.results.map((result: Film) => {
          return proccessFilm(result, relationships);
        })
      ).then((results) => {
        return {
          films: results as Film[],
          total: json.count,
        };
      });
    });
  },

  getFilm(id: number, relationships = true): Promise<Film> {
    return fetchData(`${API_URL}/films/${id}/`, (json) => {
      return proccessFilm(json, relationships);
    });
  },

  getCharacters(
    page = 1,
    relationships = false
  ): Promise<{ characters: Character[]; total: number }> {
    return fetchData(`${API_URL}/people/?page=${page}`, (json) => {
      return Promise.all(
        json.results.map((result: Character) => {
          return proccessCharacter(result, relationships);
        })
      ).then((results) => {
        return {
          characters: results as Character[],
          total: json.count,
        };
      });
    });
  },

  getCharacter(id: number, relationships = true): Promise<Character> {
    return fetchData(`${API_URL}/people/${id}/`, (json) => {
      return proccessCharacter(json, relationships);
    });
  },

  getSpecie(id: number, relationships = true): Promise<Specie> {
    return fetchData(`${API_URL}/species/${id}/`, (json) => {
      return proccessSpecie(json, relationships);
    });
  },
};

function fetchData<T>(url: string, callback: (json: any) => T | Promise<T>) {
  return fetch(url, options).then(controlError).then(callback);
}

function controlError(res: Response) {
  if (!res.ok) {
    // create error instance with HTTP status text
    const error = new Error(res.statusText);
    throw error;
  }

  return res.json();
}

function extractId(urlString: string): number {
  const url = new URL(urlString);
  return parseInt(url.pathname.split("/").splice(-2, 1)[0]);
}

function proccessFilm(json: any, relationships = false): Promise<Film> {
  json["id"] = extractId(json.url);

  const characterPromises: Promise<Character>[] = [];
  if (relationships) {
    for (const url of json.characters) {
      characterPromises.push(api.getCharacter(extractId(url), false));
    }
  }

  return new Promise((resolve) => {
    Promise.all(characterPromises).then((characters) => {
      const entity = json as Film;
      entity.characters = characters;
      resolve(entity);
    });
  });
}

function proccessCharacter(
  json: any,
  relationships = false
): Promise<Character> {
  json["id"] = extractId(json.url);

  const speciesPromises: Promise<Specie>[] = [];
  if (relationships) {
    for (const url of json.species) {
      speciesPromises.push(api.getSpecie(extractId(url)));
    }
  }

  const filmsPromises: Promise<Film>[] = [];
  if (relationships) {
    for (const url of json.films) {
      filmsPromises.push(api.getFilm(extractId(url), false));
    }
  }

  const allPromises = [
    Promise.all(speciesPromises).then((species) => {
      const entity = json as Character;
      entity.species = species;
    }),
    Promise.all(filmsPromises).then((films) => {
      const entity = json as Character;
      entity.films = films;
    }),
  ];

  return new Promise((resolve) => {
    Promise.all(allPromises).then(() => {
      const entity = json as Character;
      resolve(entity);
    });
  });
}

function proccessSpecie(json: any, relationships = false): Promise<Specie> {
  json["id"] = extractId(json.url);

  return new Promise((resolve) => {
    const entity = json as Specie;
    resolve(entity);
  });
}
