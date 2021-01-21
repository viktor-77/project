export default {
    namespaced: true,

    state: {
      cart: [],
      isCartOpen: false,
    },
  
    mutations: {
      showCart(state) {
            state.isCartOpen = !state.isCartOpen
      },
      addToCart(state, item) {
          let isElementInCart = state.cart.find(el =>el._id === item._id)
          if (!isElementInCart)
            state.cart.push({...item, count:1})
      },
      incrementElementInCart(state, itemId) {
          let elementIndex = state.cart.findIndex(el =>el._id === itemId)
          state.cart[elementIndex].count++
      },
      decrementElementInCart(state, itemId) {
          let elementIndex = state.cart.findIndex(el =>el._id === itemId)
          if(state.cart[elementIndex].count > 1) 
            state.cart[elementIndex].count--
      },
      productDeleteFromCart(state, itemId) {
          let elementIndex = state.cart.findIndex(el =>el._id === itemId)
          state.cart.splice(elementIndex,1)
      },
    },
  
    actions: {
      addToCart({ commit }, item) {
        commit('addToCart', item)
      },
      incrementElementInCart({ commit }, item) {
        commit('incrementElementInCart', item)
      },
      decrementElementInCart({ commit }, item) {
        commit('decrementElementInCart', item)
      },
      productDeleteFromCart({ commit }, item) {
        commit('productDeleteFromCart', item)
      },
      showCart({commit}) {
        commit('showCart')
      },
    },

    getters: {
      isCartOpen: state => state.isCartOpen,
      cart: state => state.cart,
    }
  }