<template>
  <div class="container py-5">
    <div v-if="film != null" class="row mb-2">
      <div class="col-12">
        <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">{{ film.title }}</h3>
            <div class="mb-1 text-muted">
              {{ new Date(film.release_date).getFullYear() }}
            </div>
            <p><strong>Director:</strong> {{ film.director }}</p>
            <p><strong>Producer:</strong> {{ film.producer }}</p>
            <p class="mb-auto">{{ film.opening_crawl }}</p>
          </div>
          <div class="col-auto d-none d-lg-block">
            <img
              :src="require(`@/assets/films/${film.episode_id}.webp`)"
              class="card-img-top"
              :alt="film.title"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="users" size="lg" fixed-width />
            Characters
          </h5>
          <div
            v-for="character in film.characters"
            :key="character.id"
            class="col col-12 col-md-4"
          >
            <CharacterCard :character="character" class="mb-4" />
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
import CharacterCard from "@/components/CharacterCard.vue";
import { useRoute } from "vue-router";
import { useFilm } from "./useFilm";

export default defineComponent({
  name: "Film",
  components: {
    Loader,
    CharacterCard,
  },
  setup() {
    const route = useRoute();
    const id: number = parseInt(route.params.id as string);

    const film = useFilm(id);

    return {
      film: film,
    };
  },
});
</script>
