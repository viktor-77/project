export default {
  namespaced: true,

  state: {
    currency: 'UAH',
  },

  mutations: {
    changeCurrency(state, currency) {
      state.currency = currency
    },
  },

  actions: {
    changeCurrency({commit}, currency) {
      commit('changeCurrency', currency)
    },
  },

  getters: {
    currency: state => state.currency,
  },
}