import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import CharacterDetails from "@/pages/CharacterDetails.vue";
// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: "/", component: Home },
  { path: "/character/:characterId", component: CharacterDetails },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
