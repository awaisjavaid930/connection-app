import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/LoginForm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterForm.vue"),
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/request",
    component: import("../components/NavbarComponent.vue"),
    children: [
      {
        path: "suggested",
        component: import("../views/requests/SuggestionView.vue"),
        meta: {
          isAuth: true,
        },
      },
      {
        path: "send",
        component: import("../views/requests/SendRequestView.vue"),
        meta: {
          isAuth: true,
        },
      },
      {
        path: "received",
        component: import("../views/requests/ReceivedRequestView.vue"),
        meta: {
          isAuth: true,
        },
      },
      {
        path: "connection",
        component: import("../views/requests/ConnectionView.vue"),
        meta: {
          isAuth: true,
        },
      },
    ],
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, next) => {
  if (to.meta.isAuth) {

    let user = localStorage.getItem('token')
    console.log(user)
    if (!user) {      
      next('/login')
    }
  }
})

export default router;
