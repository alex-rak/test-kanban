import Axios from "@/plugins/axios";

const state = {
  token: window.localStorage.getItem("token") || null,
};

const getters = {
};

const actions = {
  USER_AUTHORIZATION({ commit, dispatch }, data) {
    return Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/login/", data)
      .then(res => {
        commit("setToken", res.data.token);
        return res;
      })
      .catch(err => err.response);
  },

  USER_REGISTRATION({ commit, dispatch }, data) {
    return Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/create/", data)
      .then(res => {
        commit("setToken", res.data.token);
        return res;
      })
      .catch(err => err.response);
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    window.localStorage.setItem("token", token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
