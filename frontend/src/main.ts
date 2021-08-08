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
    debug: true,
    connection: SocketIO(process.env.VUE_APP_SOCKET_ENPOINT, {
      withCredentials: true,
      extraHeaders: {
        authorization: store.getters.token
      },
      autoConnect: false
    })
  })
);

app.use(router);
app.use(createI18n(i18nConfig));
app.use(VuesticPlugin, vuesticGlobalConfig);

app.mount("#app");
