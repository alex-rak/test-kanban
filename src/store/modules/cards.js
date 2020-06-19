const state = {
  cards: [],
};

const getters = {
};

const actions = {
  async getCardsApi({ state, commit }) {
    await fetch("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", {
      method: "GET",
      headers: {
        Authorization: "JWT " + state.token,
      },
    }).then(response => response.json()).then(data => {
      commit("setCards", data);
    });
  },
};

const mutations = {
  setCards(state, cards) {
    state.cards = cards;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
