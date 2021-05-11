<template>
  <div class="container py-5">
    <div v-if="planet != null" class="row mb-2">
      <div class="col-12">
        <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">{{ planet.name }}</h3>
            <div class="mb-1 text-muted">
              {{ planet.climate }}, {{ planet.terrain }}
            </div>
            <p>
              <strong>Diameter:</strong>
              {{ planet.diameter }} km
            </p>
            <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
            <p>
              <strong>Orbital period:</strong> {{ planet.orbital_period }} d
            </p>
            <p>
              <strong>Rotation period:</strong> {{ planet.rotation_period }} h
            </p>
            <p><strong>Population:</strong> {{ planet.population }}</p>
          </div>
          <div class="col-auto d-none d-lg-block">
            <font-awesome-icon
              icon="globe-asia"
              size="8x"
              fixed-width
              class="rounded float-start mt-2"
            />
          </div>
        </div>
      </div>
      <div class="col-12" v-if="planet.residents.length > 0">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="users" size="lg" fixed-width />
            Residents
          </h5>
          <div
            v-for="character in planet.residents"
            :key="character.id"
            class="col col-12 col-md-4"
          >
            <CharacterCard :character="character" class="mb-4" />
          </div>
        </div>
      </div>
      <div class="col-12" v-if="planet.films.length > 0">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="film" size="lg" fixed-width />
            Films
          </h5>
          <div
            v-for="film in planet.films"
            :key="film.id"
            class="col col-12 col-md-4"
          >
            <FilmCard :film="film" class="mb-4" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row row-cols-1">
      <div class="col">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loader from "@/components/Loader.vue";
import FilmCard from "@/components/FilmCard.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useRoute } from "vue-router";
import { usePlanet } from "./usePlanet";

export default defineComponent({
  name: "Planet",
  components: {
    Loader,
    FilmCard,
    CharacterCard,
  },
  setup() {
    const route = useRoute();
    const id: number = parseInt(route.params.id as string);

    const planet = usePlanet(id);

    return {
      planet: planet,
    };
  },
});
</script>
