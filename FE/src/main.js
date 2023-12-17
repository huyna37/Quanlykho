import App from "./App.vue";
import router from "./routers/router";
import store from "@/store/store";
import { createApp } from "vue";
import VueCookies from "vue3-cookies";
import "./assets/css/argon-dashboard.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueCookies);
if(process.env.NODE_ENV !== 'development') {
  app.config.errorHandler = function (err, vm, info) {
    const temp = "[Global Error Handler]: Error in " + info + ": " + err;
    console.log(temp);
  };
}

require("@/Unilities/extentions/stringExtensions");

require("./Unilities/axios/index");
app.mount("#app");
