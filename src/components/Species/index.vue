<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div
        v-if="species.length > 0"
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
      >
        <div class="col" v-for="specie in species" :key="specie.id">
          <SpecieCard :specie="specie" />
        </div>
      </div>
      <div v-else class="row row-cols-1">
        <div class="col">
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
import SpecieCard from "@/components/SpecieCard.vue";
import Loader from "@/components/Loader.vue";
import { useSpecies } from "./useSpecies";

export default defineComponent({
  name: "Species",
  components: {
    SpecieCard,
    Loader,
  },
  setup() {
    let { species, loadMore, canLoadMore } = useSpecies();

    const filteredSpecies = computed(() => {
      return species.value;
    });

    return {
      species: filteredSpecies,
      canLoadMore: canLoadMore,
      loadMore: loadMore,
    };
  },
});
</script>
