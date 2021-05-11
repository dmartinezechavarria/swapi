<template>
  <font-awesome-icon
    v-if="gender == 'female'"
    icon="female"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
  <font-awesome-icon
    v-else-if="gender == 'male'"
    icon="male"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
  <font-awesome-icon
    v-else
    icon="question"
    :size="size"
    fixed-width
    class="rounded float-start mt-2"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    gender: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "3x",
    },
  },
});
</script>
