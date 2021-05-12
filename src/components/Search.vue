<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <h2 class="mb-5">Searching "{{ search }}"</h2>
      <div v-if="characters.length > 0" class="mb-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="character in characters" :key="character.id">
            <CharacterCard :character="character" />
          </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            v-if="charactersCanLoadMore"
            class="btn btn-primary mt-3"
            @click="charactersLoadMore()"
          >
            Load more characters
          </button>
        </div>
      </div>
      <div v-if="planets.length > 0" class="mb-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="planet in planets" :key="planet.id">
            <PlanetCard :planet="planet" />
          </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            v-if="planetsCanLoadMore"
            class="btn btn-primary mt-3"
            @click="planetsLoadMore()"
          >
            Load more planets
          </button>
        </div>
      </div>
      <div v-if="species.length > 0" class="mb-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="specie in species" :key="specie.id">
            <SpecieCard :specie="specie" />
          </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            v-if="speciesCanLoadMore"
            class="btn btn-primary mt-3"
            @click="speciesLoadMore()"
          >
            Load more species
          </button>
        </div>
      </div>
      <div
        v-if="
          characters.length == 0 && planets.length == 0 && species.lenght == 0
        "
        class="row justify-content-md-center"
      >
        <div class="col col-1">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterCard from "@/components/CharacterCard.vue";
import PlanetCard from "@/components/PlanetCard.vue";
import SpecieCard from "@/components/SpecieCard.vue";
import Loader from "@/components/Loader.vue";
import { useCharacters } from "@/components/Characters/useCharacters";
import { usePlanets } from "@/components/Planets/usePlanets";
import { useSpecies } from "@/components/Species/useSpecies";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Search",
  components: {
    CharacterCard,
    PlanetCard,
    SpecieCard,
    Loader,
  },
  setup() {
    const route = useRoute();
    const search: string = route.params.search as string;

    let charactersSearch = useCharacters(search);
    let planetsSearch = usePlanets(search);
    let speciesSearch = useSpecies(search);

    return {
      search: search,
      characters: charactersSearch.characters,
      charactersCanLoadMore: charactersSearch.canLoadMore,
      charactersLoadMore: charactersSearch.loadMore,
      planets: planetsSearch.planets,
      planetsCanLoadMore: planetsSearch.canLoadMore,
      planetsLoadMore: planetsSearch.loadMore,
      species: speciesSearch.species,
      speciesCanLoadMore: speciesSearch.canLoadMore,
      speciesLoadMore: speciesSearch.loadMore,
    };
  },
});
</script>
