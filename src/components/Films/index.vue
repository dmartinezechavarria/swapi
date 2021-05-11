<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div
        v-if="films.length > 0"
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
      >
        <div class="col" v-for="film in films" :key="film.episode_id">
          <FilmCard :film="film" />
        </div>
      </div>
      <div v-else class="row row-cols-1">
        <div class="col">
          <Loader />
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button
        v-if="canLoadMore"
        class="btn btn-primary mt-5"
        @click="loadMore()"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FilmCard from "@/components/FilmCard.vue";
import Loader from "@/components/Loader.vue";
import { useFilms } from "./useFilms";

export default defineComponent({
  name: "Films",
  components: {
    FilmCard,
    Loader,
  },
  setup() {
    let { films, loadMore, canLoadMore } = useFilms();

    const filteredFilms = computed(() => {
      return films.value;
    });

    return {
      films: filteredFilms,
      canLoadMore: canLoadMore,
      loadMore: loadMore,
    };
  },
});
</script>
