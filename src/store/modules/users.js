import Axios from "axios";

const state = {
  token: null,
};

const getters = {
};

const actions = {
  USER_AUTHORIZATION(context, data) {
    return Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/login/", data)
      .then(data => data)
      .catch(error => error.response);
  },

  USER_REGISTRATION(context, data) {
    return Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/create/", data)
      .then(data => data)
      .catch(error => error.response);
  },
};

const mutations = {
  setToken(state, token) {
    if (token) {
      state.token = token;
      window.localStorage.setItem("token", token);
    } else {
      if (window.localStorage.getItem("token")) {
        state.token = window.localStorage.getItem("token");
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
