import { createRouter, createWebHashHistory} from "vue-router";
import Chatroom from "../views/Chatroom.vue";
import MainPage from "../views/MainPage.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "米花巴庫蛋(Alpha) - 首頁",
    },
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    meta: {
      title: "米花巴庫蛋(Alpha) - 聊天室",
    },
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
    path: "/user/:userId",
    name: "user",
    component: User,
    meta: {
      title: "米花巴庫蛋(Alpha) - 使用者頁面",
    },
  },
  {
    path: "/main",
    name: "mainpage",
    component: MainPage,
    meta: {
      title: "米花巴庫蛋(Alpha) - 直播間",
    },
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
