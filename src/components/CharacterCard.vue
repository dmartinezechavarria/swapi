<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <CharacterGender :gender="character.gender" />
      <h5 class="card-title">{{ character.name }}</h5>
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
import CharacterGender from "@/components/CharacterGender.vue";

export default defineComponent({
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  components: {
    CharacterGender,
  },
});
</script>
