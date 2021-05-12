<template>
  <div class="container py-5">
    <div v-if="specie != null" class="row mb-2">
      <div class="col-12">
        <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">{{ specie.name }}</h3>
            <div class="mb-1 text-muted">
              {{ specie.classification }}
            </div>
            <p>
              <strong>Average lifespan:</strong>
              {{ specie.average_lifespan }} years
            </p>
            <p>
              <strong>Average height:</strong> {{ specie.average_height }} cm
            </p>
            <p><strong>Designation:</strong> {{ specie.designation }}</p>
            <p><strong>Hair colors:</strong> {{ specie.hair_colors }}</p>
            <p><strong>Skin colors:</strong> {{ specie.skin_colors }}</p>
            <p><strong>Eye colors:</strong> {{ specie.eye_colors }}</p>
            <p><strong>Language:</strong> {{ specie.language }}</p>
          </div>
          <div class="col-auto d-none d-lg-block">
            <CharacterImage :specie="specie.name" size="8x" class="mt-5 me-5" />
          </div>
        </div>
      </div>
      <div class="col-12" v-if="specie.people.length > 0">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="users" size="lg" fixed-width />
            Characters
          </h5>
          <div
            v-for="character in specie.people"
            :key="character.id"
            class="col col-12 col-md-4"
          >
            <CharacterCard :character="character" class="mb-4" />
          </div>
        </div>
      </div>
      <div class="col-12" v-if="specie.films.length > 0">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="film" size="lg" fixed-width />
            Films
          </h5>
          <div
            v-for="film in specie.films"
            :key="film.id"
            class="col col-12 col-md-4"
          >
            <FilmCard :film="film" class="mb-4" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row justify-content-md-center">
      <div class="col col-1">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loader from "@/components/Loader.vue";
import CharacterImage from "@/components/CharacterImage.vue";
import FilmCard from "@/components/FilmCard.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { useRoute } from "vue-router";
import { useSpecie } from "./useSpecie";

export default defineComponent({
  name: "Specie",
  components: {
    Loader,
    CharacterImage,
    FilmCard,
    CharacterCard,
  },
  setup() {
    const route = useRoute();
    const id: number = parseInt(route.params.id as string);

    const specie = useSpecie(id);

    return {
      specie: specie,
    };
  },
});
</script>
