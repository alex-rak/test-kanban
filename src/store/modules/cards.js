import Axios from "@/plugins/axios";
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
  GET_CARDS({ commit }) {
    return Axios.get("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", { secured: true })
      .then(res => {
        commit("setCards", res.data);
        return res;
      })
      .catch(err => err.response);
  },

  /**
   * Запрос к API на создание карточки
   * @param {Object} data данные карточки
   */
  CREATE_CARD({ commit }, data) {
    return Axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", data, { secured: true })
      .then(res => {
        commit("addCard", res.data);
        return res;
      })
      .catch(err => err.response);
  },

  /**
   * Запрос к API на удаление карточки
   * @param {Number} id данные карточки
   */
  UPDATE_CARD({ dispatch, commit }, data) {
    commit("removeCard", data.id);
    commit("updateCard", data);
    return Axios.patch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${data.id}/`, data, { secured: true })
      .then(res => res)
      .catch(err => {
        dispatch("GET_CARDS");
        return err.response;
      });
  },

  /**
   * Запрос к API на удаление карточки
   * @param {Number} id данные карточки
   */
  DELETE_CARD({ commit }, id) {
    return Axios.delete(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`, { secured: true })
      .then(res => {
        commit("removeCard", id);
        return res;
      })
      .catch(err => err.response);
  },
};

const mutations = {
  setCards(state, cards) {
    cards.sort((a, b) => a.seq_num - b.seq_num);
    state.cards = cards.reduce((prevVal, item) => {
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
    if (state.cards[card.row]) {
      state.cards[card.row].items.push(card);
    } else {
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
