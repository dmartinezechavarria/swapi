<template>
  <div class="card shadow-sm">
    <img
      :src="require(`@/assets/films/${film.episode_id}.webp`)"
      class="card-img-top"
      :alt="film.title"
    />
    <div class="card-body">
      <h5 class="card-title">{{ film.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ new Date(film.release_date).getFullYear() }}
      </h6>
      <p class="card-text"><strong>Director:</strong> {{ film.director }}</p>
      <p class="card-text"><strong>Producer:</strong> {{ film.producer }}</p>
      <router-link
        :to="{ name: 'Film', params: { id: film.id } }"
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
    film: {
      type: Object,
      required: true,
    },
  },
});
</script>
