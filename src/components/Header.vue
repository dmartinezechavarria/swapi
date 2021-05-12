<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link
              to="/films"
              class="nav-link px-2 text-white"
              :class="{
                active: currentPath == '/' || currentPath.includes('film'),
              }"
              >Films</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Characters' }"
              class="nav-link px-2 text-white"
              :class="{ active: currentPath.includes('character') }"
              >Characters</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Species' }"
              class="nav-link px-2 text-white"
              :class="{ active: currentPath.includes('specie') }"
              >Species</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Planets' }"
              class="nav-link px-2 text-white"
              :class="{ active: currentPath.includes('planet') }"
              >Planets</router-link
            >
          </li>
        </ul>

        <div class="d-flex">
          <div class="form-check form-switch me-5">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              v-model="wookie"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault"
              >Wookie Mode</label
            >
          </div>
        </div>

        <form class="d-flex" @submit.prevent="submitSearch">
          <input
            type="search"
            class="form-control form-control-dark me-2"
            placeholder="Search..."
            aria-label="Search"
            v-model="search"
            required
          />
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="search.length == 0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore, WOOKIE_CHANGE } from "@/store";
import router from "@/router";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();

    const wookie = computed({
      get: () => {
        return store.state.wookie;
      },
      set: (value) => {
        store.commit(WOOKIE_CHANGE, value);
        router.go(0);
      },
    });

    const search = ref("");
    const submitSearch = () => {
      router.push({ name: "Search", params: { search: search.value } });
    };

    const route = useRoute();
    const currentPath = computed(() => route.path);

    return {
      currentPath: currentPath,
      wookie: wookie,
      search: search,
      submitSearch: submitSearch,
    };
  },
});
</script>
