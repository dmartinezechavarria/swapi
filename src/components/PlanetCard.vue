<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <font-awesome-icon
        icon="globe-asia"
        size="3x"
        fixed-width
        class="rounded float-start mt-2"
      />
      <h5 class="card-title">{{ planet.name }}</h5>
      <h6 class="card-subtitle text-muted">
        {{ planet.climate }}, {{ planet.terrain }}
      </h6>
      <router-link
        :to="{ name: 'Planet', params: { id: planet.id } }"
        class="btn btn-primary float-end"
        >View</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    planet: {
      type: Object,
      required: true,
    },
  },
});
</script>
