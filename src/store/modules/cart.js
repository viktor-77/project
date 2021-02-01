export default {
    namespaced: true,

    state: {
      cart: [{"_id":"60072e15a301d91bcc54090f","imgSrc":"https://i.allo.ua/media/catalog/product/cache/3/image/425x295/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/123123123_6.jpg","price":35499,"title":"Apple iPhone 11","RAM":"4","memory":"64","category":"Phone","year":2019,"color":"Purple","createdAt":"2021-01-19T19:08:05.714Z","updatedAt":"2021-01-19T19:08:05.714Z","__v":0,"count":1},{"_id":"60072e15a301d91bcc54090f","imgSrc":"https://i.allo.ua/media/catalog/product/cache/3/image/425x295/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/123123123_6.jpg","price":35499,"title":"Apple iPhone 11","RAM":"4","memory":"64","category":"Phone","year":2019,"color":"Purple","createdAt":"2021-01-19T19:08:05.714Z","updatedAt":"2021-01-19T19:08:05.714Z","__v":0,"count":1},{"_id":"60072e15a301d91bcc54090f","imgSrc":"https://i.allo.ua/media/catalog/product/cache/3/image/425x295/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/123123123_6.jpg","price":35499,"title":"Apple iPhone 11","RAM":"4","memory":"64","category":"Phone","year":2019,"color":"Purple","createdAt":"2021-01-19T19:08:05.714Z","updatedAt":"2021-01-19T19:08:05.714Z","__v":0,"count":1}],
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