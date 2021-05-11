<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <CharacterImage :specie="specie.name" class="me-3" />
      <h5 class="card-title">{{ specie.name }}</h5>
      <h6 class="card-subtitle text-muted">
        {{ specie.classification }}
      </h6>
      <router-link
        :to="{ name: 'Specie', params: { id: specie.id } }"
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
    specie: {
      type: Object,
      required: true,
    },
  },
  components: {
    CharacterImage,
  },
});
</script>
