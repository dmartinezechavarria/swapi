<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div
        v-if="characters.length > 0"
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
      >
        <div class="col" v-for="character in characters" :key="character.id">
          <CharacterCard :character="character" />
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
import CharacterCard from "@/components/CharacterCard.vue";
import Loader from "@/components/Loader.vue";
import { useCharacters } from "./useCharacters";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    Loader,
  },
  setup() {
    let { characters, loadMore, canLoadMore } = useCharacters();

    const filteredCharacters = computed(() => {
      return characters.value;
    });

    return {
      characters: filteredCharacters,
      canLoadMore: canLoadMore,
      loadMore: loadMore,
    };
  },
});
</script>
