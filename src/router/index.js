import { createRouter, createWebHashHistory } from "vue-router";
import Chatroom from "../views/Chatroom.vue";
import MainPage from "../views/MainPage.vue";
import Test from "../views/Test.vue";
import Test1 from "../views/Test1.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Chatroom
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/test1",
    name: "test1",
    component: Test1,
  },
  {
    path: "/main",
    name: "mainpage",
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
