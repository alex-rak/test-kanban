import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "axios";

import vInput from "@/components/UI/vInput";
import vButton from "@/components/UI/vButton";

Vue.component("vInput", vInput);
Vue.component("vButton", vButton);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
