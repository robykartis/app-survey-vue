import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import AuthLayouts from "../components/AuthLayouts.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import DefaultLayouts from "../components/DefaultLayouts.vue";
import Dashboard from "../views/Dashboard.vue";
import Surveys from "../views/Surveys.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/auth",
    redirect: "/login",
    component: AuthLayouts,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayouts,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/surveys",
        name: "Surveys",
        component: Surveys,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (
    store.state.user.token &&
    (to.name === "Login" || to.name === "Register")
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});
export default router;
