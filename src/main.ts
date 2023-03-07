import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import { apolloClient } from "@/services/api";
import { DefaultApolloClient } from "@vue/apollo-composable";
import Router from "@/routes";

createApp(App)
  .use(Router)
  .provide(DefaultApolloClient, apolloClient)
  .mount("#app");
