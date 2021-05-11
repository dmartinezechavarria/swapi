<template>
  <div class="container py-5">
    <div v-if="character != null" class="row mb-2">
      <div class="col-12">
        <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">{{ character.name }}</h3>
            <div class="mb-1 text-muted">
              {{
                character.species.length > 0
                  ? character.species.map((specie) => specie.name).join(", ")
                  : "Human"
              }}
            </div>
            <p><strong>Gender:</strong> {{ character.gender }}</p>
            <p><strong>Height:</strong> {{ character.height }}</p>
            <p><strong>Mass:</strong> {{ character.mass }}</p>
            <p><strong>Hair color:</strong> {{ character.hair_color }}</p>
            <p><strong>Skin color:</strong> {{ character.skin_color }}</p>
            <p><strong>Eye color:</strong> {{ character.eye_color }}</p>
            <p><strong>Birth year:</strong> {{ character.birth_year }}</p>
          </div>
          <div class="col-auto d-none d-lg-block">
            <CharacterGender
              :gender="character.gender"
              size="8x"
              class="mt-5"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <h5 class="mt-3">
            <font-awesome-icon icon="film" size="lg" fixed-width />
            Films
          </h5>
          <div
            v-for="film in character.films"
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
import CharacterGender from "@/components/CharacterGender.vue";
import FilmCard from "@/components/FilmCard.vue";
import { useRoute } from "vue-router";
import { useCharacter } from "./useCharacter";

export default defineComponent({
  name: "Character",
  components: {
    Loader,
    CharacterGender,
    FilmCard,
  },
  setup() {
    const route = useRoute();
    const id: number = parseInt(route.params.id as string);

    const character = useCharacter(id);

    return {
      character: character,
    };
  },
});
</script>
