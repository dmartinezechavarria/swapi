import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Films from "@/components/Films/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Films,
  },
  {
    path: "/films",
    name: "Films",
    component: Films,
  },
  {
    path: "/film/:id(\\d+)",
    name: "Film",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "film" */ "../components/Film/index.vue"),
  },
  {
    path: "/characters",
    name: "Characters",
    component: () =>
      import(
        /* webpackChunkName: "characters" */ "../components/Characters/index.vue"
      ),
  },
  {
    path: "/character/:id(\\d+)",
    name: "Character",
    component: () =>
      import(
        /* webpackChunkName: "character" */ "../components/Character/index.vue"
      ),
  },
  {
    path: "/species",
    name: "Species",
    component: () =>
      import(
        /* webpackChunkName: "species" */ "../components/Species/index.vue"
      ),
  },
  {
    path: "/specie/:id(\\d+)",
    name: "Specie",
    component: () =>
      import(/* webpackChunkName: "specie" */ "../components/Specie/index.vue"),
  },
  {
    path: "/planets",
    name: "Planets",
    component: () =>
      import(
        /* webpackChunkName: "planets" */ "../components/Planets/index.vue"
      ),
  },
  {
    path: "/planet/:id(\\d+)",
    name: "Planet",
    component: () =>
      import(/* webpackChunkName: "planet" */ "../components/Planet/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
