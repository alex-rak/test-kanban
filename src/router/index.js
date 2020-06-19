import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "Main" */"@/pages/Main"),
  },
  {
    path: "/auth",
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
  if (!token && to.path !== "/auth") {
    next("/auth");
  } else if (token && to.path === "/auth") {
    next("/");
  } else {
    next();
  }
});

export default router;
