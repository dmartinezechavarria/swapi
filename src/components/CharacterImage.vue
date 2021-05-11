<template>
  <font-awesome-icon
    v-if="specie == null || specie == 'Human'"
    icon="user"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
  <font-awesome-icon
    v-else-if="specie == 'Droid'"
    icon="robot"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
  <font-awesome-icon
    v-else
    :icon="['fab', 'reddit-alien']"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    specie: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: "3x",
    },
  },
});
</script>
