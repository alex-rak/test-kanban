import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => {
      if (!store.state.token) {
        return import(/* webpackChunkName: "Auth" */"@/pages/Auth");
      } else {
        return import(/* webpackChunkName: "MainPage" */"@/pages/Main");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
