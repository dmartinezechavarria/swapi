<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <CharacterImage
        :specie="
          character.species.length > 0 ? character.species[0].name : null
        "
        class="me-3"
      />
      <h5 class="card-title">{{ character.name }}</h5>
      <h6 class="card-subtitle text-muted">
        {{
          character.species.length > 0
            ? character.species.map((specie) => specie.name).join(", ")
            : "Human"
        }}
      </h6>
      <router-link
        :to="{ name: 'Character', params: { id: character.id } }"
        class="btn btn-primary float-end"
        >View</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterImage from "@/components/CharacterImage.vue";

export default defineComponent({
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  components: {
    CharacterImage,
  },
});
</script>
