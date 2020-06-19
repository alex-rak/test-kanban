import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users";
import cards from "./modules/cards";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users, cards,
  },
});
