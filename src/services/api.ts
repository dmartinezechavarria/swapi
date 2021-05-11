import { Film } from "@/types/Film";
import { Character } from "@/types/Character";
import { Specie } from "@/types/Specie";
import { Planet } from "@/types/Planet";
import { toShyriiwook } from "@/services/wookie";

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
    relationships = false,
    wookie = false
  ): Promise<{ films: Film[]; total: number }> {
    return fetchData(getURL(`films/?page=${page}`), (json) => {
      return Promise.all(
        json.results.map((result: Film) => {
          return proccessFilm(result, relationships, wookie);
        })
      ).then((results) => {
        return {
          films: results as Film[],
          total: json.count,
        };
      });
    });
  },

  getFilm(id: number, relationships = true, wookie = false): Promise<Film> {
    return fetchData(getURL(`films/${id}/`), (json) => {
      return proccessFilm(json, relationships, wookie);
    });
  },

  getCharacters(
    page = 1,
    relationships = false,
    wookie = false
  ): Promise<{ characters: Character[]; total: number }> {
    return fetchData(getURL(`people/?page=${page}`), (json) => {
      return Promise.all(
        json.results.map((result: Character) => {
          return proccessCharacter(result, relationships, wookie);
        })
      ).then((results) => {
        return {
          characters: results as Character[],
          total: json.count,
        };
      });
    });
  },

  getCharacter(
    id: number,
    relationships = true,
    wookie = false
  ): Promise<Character> {
    return fetchData(getURL(`people/${id}/`), (json) => {
      return proccessCharacter(json, relationships, wookie);
    });
  },

  getSpecies(
    page = 1,
    relationships = false,
    wookie = false
  ): Promise<{ species: Specie[]; total: number }> {
    return fetchData(getURL(`species/?page=${page}`), (json) => {
      return Promise.all(
        json.results.map((result: Specie) => {
          return proccessSpecie(result, relationships, wookie);
        })
      ).then((results) => {
        return {
          species: results as Specie[],
          total: json.count,
        };
      });
    });
  },

  getSpecie(id: number, relationships = true, wookie = false): Promise<Specie> {
    return fetchData(getURL(`species/${id}/`), (json) => {
      return proccessSpecie(json, relationships, wookie);
    });
  },

  getPlanets(
    page = 1,
    relationships = false,
    wookie = false
  ): Promise<{ planets: Planet[]; total: number }> {
    return fetchData(getURL(`planets/?page=${page}`), (json) => {
      return Promise.all(
        json.results.map((result: Planet) => {
          return proccessPlanet(result, relationships, wookie);
        })
      ).then((results) => {
        return {
          planets: results as Planet[],
          total: json.count,
        };
      });
    });
  },

  getPlanet(id: number, relationships = true, wookie = false): Promise<Planet> {
    return fetchData(getURL(`planets/${id}/`), (json) => {
      return proccessPlanet(json, relationships, wookie);
    });
  },
};

function getURL(endpoint: string): string {
  return `${API_URL}/${endpoint}`;
}

function fetchData<T>(
  url: string,
  callback: (
    // eslint-disable-next-line
    json: any
  ) => T | Promise<T>
) {
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

function proccessFilm(
  // eslint-disable-next-line
  json: any,
  relationships = false,
  wookie = false
): Promise<Film> {
  json["id"] = extractId(json.url);

  const entity = (wookie ? toWookie(json) : json) as Film;

  const characterPromises: Promise<Character>[] = [];
  if (relationships) {
    for (const url of json.characters) {
      characterPromises.push(api.getCharacter(extractId(url), false, wookie));
    }
  }

  const speciesPromises: Promise<Specie>[] = [];
  if (relationships) {
    for (const url of json.species) {
      speciesPromises.push(api.getSpecie(extractId(url), false, wookie));
    }
  }

  const planetPromises: Promise<Planet>[] = [];
  if (relationships) {
    for (const url of json.planets) {
      planetPromises.push(api.getPlanet(extractId(url), false, wookie));
    }
  }

  const allPromises = [
    Promise.all(speciesPromises).then((species) => {
      entity.species = species;
    }),
    Promise.all(characterPromises).then((characters) => {
      entity.characters = characters;
    }),
    Promise.all(planetPromises).then((planets) => {
      entity.planets = planets;
    }),
  ];

  return new Promise((resolve) => {
    Promise.all(allPromises).then(() => {
      resolve(entity);
    });
  });
}

function proccessCharacter(
  // eslint-disable-next-line
  json: any,
  relationships = false,
  wookie = false
): Promise<Character> {
  json["id"] = extractId(json.url);

  const entity = (wookie ? toWookie(json) : json) as Character;

  const homeworldPromise: Promise<Planet> = api.getPlanet(
    extractId(json.homeworld),
    false,
    wookie
  );

  const speciesPromises: Promise<Specie>[] = [];
  for (const url of json.species) {
    speciesPromises.push(api.getSpecie(extractId(url), false, wookie));
  }

  const filmsPromises: Promise<Film>[] = [];
  if (relationships) {
    for (const url of json.films) {
      filmsPromises.push(api.getFilm(extractId(url), false, wookie));
    }
  }

  const allPromises = [
    Promise.all(speciesPromises).then((species) => {
      entity.species = species;
    }),
    Promise.all(filmsPromises).then((films) => {
      entity.films = films;
    }),
    homeworldPromise.then((planet) => {
      entity.homeworld = planet;
    }),
  ];

  return new Promise((resolve) => {
    Promise.all(allPromises).then(() => {
      resolve(entity);
    });
  });
}

function proccessSpecie(
  // eslint-disable-next-line
  json: any,
  relationships = false,
  wookie = false
): Promise<Specie> {
  json["id"] = extractId(json.url);

  const entity = (wookie ? toWookie(json) : json) as Specie;

  const filmsPromises: Promise<Film>[] = [];
  if (relationships) {
    for (const url of json.films) {
      filmsPromises.push(api.getFilm(extractId(url), false, wookie));
    }
  }

  const characterPromises: Promise<Character>[] = [];
  if (relationships) {
    for (const url of json.people) {
      characterPromises.push(api.getCharacter(extractId(url), false, wookie));
    }
  }

  const allPromises = [
    Promise.all(filmsPromises).then((films) => {
      entity.films = films;
    }),
    Promise.all(characterPromises).then((characters) => {
      entity.people = characters;
    }),
  ];

  return new Promise((resolve) => {
    Promise.all(allPromises).then(() => {
      resolve(entity);
    });
  });
}

function proccessPlanet(
  // eslint-disable-next-line
  json: any,
  relationships = false,
  wookie = false
): Promise<Planet> {
  json["id"] = extractId(json.url);

  const entity = (wookie ? toWookie(json) : json) as Planet;

  const filmsPromises: Promise<Film>[] = [];
  if (relationships) {
    for (const url of json.films) {
      filmsPromises.push(api.getFilm(extractId(url), false, wookie));
    }
  }

  const characterPromises: Promise<Character>[] = [];
  if (relationships) {
    for (const url of json.residents) {
      characterPromises.push(api.getCharacter(extractId(url), false, wookie));
    }
  }

  const allPromises = [
    Promise.all(filmsPromises).then((films) => {
      entity.films = films;
    }),
    Promise.all(characterPromises).then((characters) => {
      entity.residents = characters;
    }),
  ];

  return new Promise((resolve) => {
    Promise.all(allPromises).then(() => {
      resolve(entity);
    });
  });
}

function toWookie(
  // eslint-disable-next-line
  json: any
  // eslint-disable-next-line
): any {
  Object.keys(json).map((key) => {
    const value = json[key];
    if (typeof value === "string") {
      json[key] = toShyriiwook(value);
    } else {
      json[key] = value;
    }
  });

  return json;
}
