import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Calc",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "calc" */ "../views/Calc.vue");
    }
  },
  {
    path: "/comments",
    name: "Comments",
    component: function() {
      return import(/* webpackChunkName: "Comments" */ "../views/Comments.vue");
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
