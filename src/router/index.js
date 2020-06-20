import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "Main" */"@/pages/Main"),
    beforeEnter(to, from, next) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        next({ name: "Auth" });
      } else {
        next();
      }
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "Auth" */"@/pages/Auth"),
    beforeEnter(to, from, next) {
      const token = window.localStorage.getItem("token");
      if (token) {
        next({ name: "Main" });
      } else {
        next();
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
