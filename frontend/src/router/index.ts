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
    redirect: { name: "dashboard" }
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
    name: "admin",
    path: "/admin",
    component: AppLayout,
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("@/pages/admin/dashboard/Dashboard.vue")
      },
      {
        name: "statistics",
        path: "statistics",
        component: RouteViewComponent,
        children: [
          {
            name: "charts",
            path: "charts",
            component: () =>
              import("@/pages/admin/statistics/charts/Charts.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Charts"
            }
          },
          {
            name: "progress-bars",
            path: "progress-bars",
            component: () =>
              import("@/pages/admin/statistics/progress-bars/ProgressBars.vue"),
            meta: {
              wikiLink:
                "https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars"
            }
          }
        ]
      },
      {
        name: "forms",
        path: "forms",
        component: RouteViewComponent,
        children: [
          {
            name: "form-elements",
            path: "form-elements",
            component: () =>
              import("@/pages/admin/forms/form-elements/FormElements.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/inputs"
            }
          },
          {
            name: "medium-editor",
            path: "medium-editor",
            component: () =>
              import("@/pages/admin/forms/medium-editor/MediumEditor.vue"),
            meta: {
              wikiLink:
                "https://github.com/epicmaxco/vuestic-admin/wiki/Medium-Editor"
            }
          }
        ]
      },
      {
        name: "maps",
        path: "maps",
        component: RouteViewComponent,
        children: [
          {
            name: "google-maps",
            path: "google-maps",
            component: () =>
              import("@/pages/admin/maps/google-maps/GoogleMapsPage.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Maps"
            }
          },
          {
            name: "yandex-maps",
            path: "yandex-maps",
            component: () =>
              import("@/pages/admin/maps/yandex-maps/YandexMapsPage.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Maps"
            }
          },
          {
            name: "leaflet-maps",
            path: "leaflet-maps",
            component: () =>
              import("@/pages/admin/maps/leaflet-maps/LeafletMapsPage.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Maps"
            }
          },
          {
            name: "bubble-maps",
            path: "bubble-maps",
            component: () =>
              import("@/pages/admin/maps/bubble-maps/BubbleMapsPage.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Maps"
            }
          },
          {
            name: "line-maps",
            path: "line-maps",
            component: () =>
              import("@/pages/admin/maps/line-maps/LineMapsPage.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Maps"
            }
          }
        ]
      },
      {
        name: "tables",
        path: "tables",
        component: RouteViewComponent,
        children: [
          {
            name: "markup",
            path: "markup",
            component: () =>
              import("@/pages/admin/tables/markup-tables/MarkupTables.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Tables"
            }
          },
          {
            name: "data",
            path: "data",
            component: () =>
              import("@/pages/admin/tables/data-tables/DataTables.vue"),
            meta: {
              wikiLink: "https://github.com/epicmaxco/vuestic-admin/wiki/Tables"
            }
          }
        ]
      },
      {
        name: "pages",
        path: "pages",
        component: RouteViewComponent,
        children: [
          {
            name: "404-pages",
            path: "404-pages",
            component: () => import("@/pages/admin/pages/404PagesPage.vue")
          },
          {
            name: "faq",
            path: "faq",
            component: () => import("@/pages/admin/pages/FaqPage.vue")
          }
        ]
      },
      UIRoute
    ]
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/pages/auth/login/Login.vue")
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("@/pages/auth/signup/Signup.vue")
      },
      {
        name: "recover-password",
        path: "recover-password",
        component: () =>
          import("@/pages/auth/recover-password/RecoverPassword.vue")
      },
      {
        path: "",
        redirect: { name: "login" }
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
