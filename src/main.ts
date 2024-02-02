import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vant/lib/index.css";
// 引入css
import "vant/es/toast/style";
import "vant/es/notify/style";
import Router from "@/router/index.js";
import pinia from "./store";
// 按需引入组件
import Vant from "vant";

const app = createApp(App);

app.use(Vant).use(Router).use(pinia);
app.mount("#app");
