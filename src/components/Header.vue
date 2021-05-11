<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link to="/" class="nav-link px-2 text-white"
              >Home</router-link
            >
          </li>
          <li>
            <router-link to="/films" class="nav-link px-2 text-white"
              >Films</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Characters' }"
              class="nav-link px-2 text-white"
              >Characters</router-link
            >
          </li>
        </ul>

        <form class="d-flex">
          <div class="form-check form-switch me-5">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault"
              >Wookie Mode</label
            >
          </div>
        </form>

        <form class="d-flex">
          <input
            type="search"
            class="form-control form-control-dark me-2"
            placeholder="Search..."
            aria-label="Search"
          />
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>
