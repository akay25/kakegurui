import { VuesticPlugin, useGlobalConfig } from "vuestic-ui";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { loadFromLocalStorage } from "@/utils";
import vuesticGlobalConfig from "./services/vuestic-ui/global-config";

// TODO: Can't use this library cause it uses Vue2 instead of Vue3,
// when updated please make sure to use this library
// import VueToast from "vue-toast-notification";
// // Import one of the available themes
// //import 'vue-toast-notification/dist/theme-default.css';
// import "vue-toast-notification/dist/theme-sugar.css";

const i18nConfig = {
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: require("@/i18n/en.json"),
    ch: require("@/i18n/cn.json"),
    es: require("@/i18n/es.json"),
    ir: require("@/i18n/ir.json"),
    br: require("@/i18n/br.json")
  }
};

const app = createApp(App);
app.use(store);

// Load data from localStorage
loadFromLocalStorage();

// Socket configuration
app.use(
  new VueSocketIO({
    debug: process.env.VUE_APP_ENV === "DEV",
    connection: SocketIO(process.env.VUE_APP_SOCKET_ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        authorization: store.getters.token
      },
      autoConnect: false
    })
  })
);

app.use(router);
// app.use(VueToast);
app.use(createI18n(i18nConfig));
app.use(VuesticPlugin, vuesticGlobalConfig);

app.mount("#app");
