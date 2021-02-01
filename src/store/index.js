import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth";
import products from "./modules/products";
import cart from "./modules/cart";
import filters from "./modules/filters";
import currency from "./modules/currency";
// import products from "@/products";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...products.state,
    ...cart.state,
    ...filters.state,
    ...currency.state,
    ...auth.state
  },
  mutations: {
    ...products.mutations,
    ...cart.mutations, 
    ...filters.mutations,
    ...currency.mutations,
    ...auth.mutations
  },
  actions: {
    ...products.actions,
    ...currency.actions,
    ...filters.actions,
    ...cart.actions,
    ...auth.actions
  },
  getters: {
    ...products.getters,
    ...currency.getters,
    ...filters.getters,
    ...cart.getters,
    ...auth.getters
  },
})

export default store