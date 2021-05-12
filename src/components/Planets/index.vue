<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div
        v-if="planets.length > 0"
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
      >
        <div class="col" v-for="planet in planets" :key="planet.id">
          <PlanetCard :planet="planet" />
        </div>
      </div>
      <div v-else class="row justify-content-md-center">
        <div class="col col-1">
          <Loader />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import PlanetCard from "@/components/PlanetCard.vue";
import Loader from "@/components/Loader.vue";
import { usePlanets } from "./usePlanets";

export default defineComponent({
  name: "Species",
  components: {
    PlanetCard,
    Loader,
  },
  setup() {
    let { planets, loadMore, canLoadMore } = usePlanets();

    const filteredPlanets = computed(() => {
      return planets.value;
    });

    return {
      planets: filteredPlanets,
      canLoadMore: canLoadMore,
      loadMore: loadMore,
    };
  },
});
</script>
