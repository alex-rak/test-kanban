const state = {
  token: null,
};

const getters = {
};

const actions = {
  async getTokenApi({ state, commit }) {
    if (localStorage.getItem("table-task-token")) {
      const token = localStorage.getItem("table-task-token");
      commit("setToken", JSON.parse(token));
    } else {
      await fetch("https://trello.backend.tests.nekidaem.ru/api/v1/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "rak",
          password: "string123",
        }),
      }).then(response => response.json()).then(data => {
        commit("setToken", data);
      });
    }
  },

  async registration({ state, commit }, data) {
    await fetch("https://trello.backend.tests.nekidaem.ru/api/v1/users/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
      commit("setToken", data);
    });
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
