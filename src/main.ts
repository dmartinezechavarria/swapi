import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import {
  faRobot,
  faUser,
  faUsers,
  faFilm,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

library.add(faRobot);
library.add(faUser);
library.add(faRedditAlien);
library.add(faUsers);
library.add(faFilm);
library.add(faGlobeAsia);

createApp(App)
  .use(store, key)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
