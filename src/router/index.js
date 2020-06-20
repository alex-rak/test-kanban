import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "Main" */"@/pages/Main"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "Auth" */"@/pages/Auth"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const token = window.localStorage.getItem("token");

router.beforeEach((to, from, next) => {
  if (!token && to.name !== "Auth") {
    next({ name: "Auth" });
  } else if (token && to.name === "Auth") {
    next({ name: "Main" });
  } else {
    next();
  }
});

export default router;
