import Axios from "axios";
const state = {
  token: window.localStorage.getItem("token") || null,
};

const getters = {
};

const actions = {
  async USER_AUTHORIZATION({ commit }, data) {
    const res = await Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/login/", data)
      .then(data => data)
      .catch(err => err.response);
    if (res.statusText === "OK") {
      commit("setToken", res.data.token);
    }
    return res;
  },

  async USER_REGISTRATION(context, data) {
    const res = await Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/create/", data)
      .then(data => data)
      .catch(err => err.response);
    if (res.statusText === "OK") {
      context.commit("setToken", res.data.token);
    }
    return res;
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
