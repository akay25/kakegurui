import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layout/auth-layout.vue";
import AppLayout from "@/layout/app-layout.vue";
import RoomLayout from "@/layout/room-layout.vue";
import Page404Layout from "@/layout/page-404-layout.vue";

import RouteViewComponent from "./route-view.vue";
import UIRoute from "@/pages/admin/ui/route";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: "homepage" }
  },
  {
    path: "/room",
    component: RoomLayout,
    children: [
      {
        name: "room",
        path: ":roomID",
        component: () => import("@/pages/room/index.vue")
      }
    ]
  },
  {
    path: "/404",
    component: Page404Layout,
    children: [
      {
        name: "not-found-advanced",
        path: "not-found-advanced",
        component: () => import("@/pages/404-pages/VaPageNotFoundSearch.vue")
      },
      {
        name: "not-found-simple",
        path: "not-found-simple",
        component: () => import("@/pages/404-pages/VaPageNotFoundSimple.vue")
      },
      {
        name: "not-found-custom",
        path: "not-found-custom",
        component: () => import("@/pages/404-pages/VaPageNotFoundCustom.vue")
      },
      {
        name: "not-found-large-text",
        path: "/pages/not-found-large-text",
        component: () => import("@/pages/404-pages/VaPageNotFoundLargeText.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes
});

export default router;
