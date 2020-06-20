import Axios from "axios";
import Vue from "vue";
const state = {
  cards: {},
};

const getters = {
};

const actions = {
  /**
   * Запрос к API на получение массива карточек
   */
  async GET_CARDS({ rootState, commit }) {
    const res = await Axios.get("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", {
      headers: {
        Authorization: "JWT " + rootState.users.token,
      },
    })
      .then(res => res)
      .catch(err => err.response);
    if (res.statusText === "OK") {
      commit("setCards", res.data);
    }
    return res;
  },

  /**
   * Запрос к API на создание карточки
   * @param {Object} data данные карточки
   */
  async CREATE_CARD({ rootState, commit }, data) {
    const res = await Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", data, {
      headers: {
        Authorization: "JWT " + rootState.users.token,
      },
    })
      .then(res => res)
      .catch(err => err.response);
    if (res.status === 201) {
      commit("addCard", res.data);
    }
    return res;
  },

  /**
   * Запрос к API на удаление карточки
   * @param {Number} id данные карточки
   */
  async UPDATE_CARD({ rootState, dispatch, commit }, data) {
    commit("removeCard", data.id);
    commit("updateCard", data);
    const res = await Axios.patch("https://trello.backend.tests.nekidaem.ru/api/v1/cards/" + data.id, data, {
      headers: {
        Authorization: "JWT " + rootState.users.token,
      },
    })
      .then(res => res)
      .catch(err => err.response);
    if (res.status === 200) {
      console.log("Успешно изменена", res);
    } else {
      dispatch("GET_CARDS");
    }
    return res;
  },

  /**
   * Запрос к API на удаление карточки
   * @param {Number} id данные карточки
   */
  async DELETE_CARD({ rootState, commit }, id) {
    const res = await Axios.delete("https://trello.backend.tests.nekidaem.ru/api/v1/cards/" + id, {
      headers: {
        Authorization: "JWT " + rootState.users.token,
      },
    })
      .then(res => res)
      .catch(err => err.response);
    if (res.status === 204) {
      console.log("Успешно удалена", id);
      commit("removeCard", id);
    }
    return res;
  },
};

const mutations = {
  setCards(state, cards) {
    cards.sort((a, b) => a.seq_num - b.seq_num);
    state.cards = cards.reduce((prevVal, item) => {
      console.log(item);
      const column = prevVal[item.row];
      if (column) {
        column.items.push(item);
      } else {
        prevVal[item.row] = {
          id: item.row,
          items: [item],
        };
      }
      return prevVal;
    }, {});
  },
  addCard(state, card) {
    console.log(card);
    if (state.cards[card.row]) {
      console.log("Было");
      state.cards[card.row].items.push(card);
    } else {
      console.log("Не Было");
      Vue.set(state.cards, card.row, {
        id: card.row,
        items: [card],
      });
    }
  },
  removeCard(state, id) {
    for (const key in state.cards) {
      const index = state.cards[key].items.findIndex(item => item.id === id);
      if (index > -1) {
        state.cards[key].items.splice(index, 1);
      }
    }
  },
  updateCard(state, card) {
    if (state.cards[card.row]) {
      const index = state.cards[card.row].items.findIndex(item => item.id === card.id);
      if (index === -1) {
        state.cards[card.row].items.splice(card.seq_num, 0, card);
      } else {
        state.cards[card.row].items.splice(index, 1, card);
      }
    } else {
      Vue.set(state.cards, card.row, {
        id: card.row,
        items: [card],
      });
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
