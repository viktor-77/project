import Vue from 'vue'
import Vuex from 'vuex'
import apiEndpoints from "../../constants/apiEndpoints";
// import products from "@/products";
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currency: 'UAH',
    products: [],
    filter:{
      title: null,
      minPrice: null,
      maxPrice: null,
      category: null,
      year: [],
      color: [],
      RAM: [],
      memory: [],
    },
    cart: [],
    isCartOpen: false,
  },
  mutations: {
    setProductsListData(state, data) {
      state.products = [...data];
    },
    setFilterData(state,item) {
      state.filter = {
        ...state.filter,         
        ...item
    }},
    addToCart(state, item) {
      let isElementInCart = state.cart.find(el =>el.id == item.id)
      if (!isElementInCart)
        state.cart.push({...item, count:1})
    },
    incrementElementInCart(state, itemId) {
      let elementIndex = state.cart.findIndex(el =>el.id === itemId)
      state.cart[elementIndex].count++
    },
    decrementElementInCart(state, itemId) {
      let elementIndex = state.cart.findIndex(el =>el.id === itemId)
      if(state.cart[elementIndex].count > 1) 
        state.cart[elementIndex].count--
    },
    productDeleteFromCart(state, itemId) {
      let elementIndex = state.cart.findIndex(el =>el.id === itemId)
      state.cart.splice(elementIndex,1)
    },
    changeCurrency(state, currency) {
      state.currency = currency
    },
    showCart(state) {
      state.isCartOpen = !state.isCartOpen
    },
  },
  actions: {
    loadData({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.products.read)
          .then(res => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setProductsListData", resData.products);
            }
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          })
      });
    },
    setFilterData({commit}, item) {
      commit('setFilterData', item)
    },
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
    changeCurrency({commit}, currency) {
      commit('changeCurrency', currency)
    },
    showCart({commit}) {
      commit('showCart')
    },
  },
  getters: {
    cart: state => state.cart,
    products: state => state.products,
    currency: state => state.currency,
    isCartOpen: state => state.isCartOpen,
    categoriesArray: (state) => { //all kind of categories
      let categories = []
      state.products.forEach(item => {
        if( !categories.includes(item.category))
          categories.push(item.category)
      })
      categories.sort()
      return categories
    },
    isFilterEmpty: (state) => {
      return state.filter.title === null &&
      state.filter.minPrice === null &&
      state.filter.maxPrice === null &&
      !state.filter.year.length &&
      state.filter.category === null &&
      !state.filter.color.length &&
      !state.filter.RAM.length &&
      !state.filter.memory.length 
    },
    filteredProducts: (state,getters) => {
      if(getters.isFilterEmpty) return state.products
      return state.products.filter(item =>
        (!state.filter.title || 
          item.title.toLowerCase().split(' ').join('').includes(state.filter.title)) &&
        (state.filter.minPrice === null || +item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === null || +item.price <= state.filter.maxPrice) &&
        (state.filter.category === null || item.category === state.filter.category) &&
        (!state.filter.year.length || state.filter.year.includes(item.year)) &&
        (!state.filter.color.length || state.filter.color.includes(item.color)) &&
        (!state.filter.RAM.length || state.filter.RAM.includes(item.RAM)) &&
        (!state.filter.memory.length || state.filter.memory.includes(item.memory))
      )        
    },
    filteredYears: (state,getters) => {    //filter without years
      if(getters.isFilterEmpty) return state.products
      return state.products.filter(item =>
        (!state.filter.title || item.title.toLowerCase().includes(state.filter.title)) &&
        (state.filter.minPrice === null || +item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === null || +item.price <= state.filter.maxPrice) &&
        (state.filter.category === null || item.category === state.filter.category) &&
        (!state.filter.color.length || state.filter.color.includes(item.color))&&
        (!state.filter.RAM.length || state.filter.RAM.includes(item.RAM))&&
        (!state.filter.memory.length || state.filter.memory.includes(item.memory)) 
      )          
    },
    filteredColors: (state,getters) => {    //filter without colors
      if(getters.isFilterEmpty) return state.products
      return state.products.filter(item => 
        (!state.filter.title || item.title.toLowerCase().includes(state.filter.title)) &&
        (state.filter.minPrice === null || +item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === null || +item.price <= state.filter.maxPrice) &&
        (state.filter.category === null || item.category === state.filter.category) &&
        (!state.filter.year.length || state.filter.year.includes(item.year))&&
        (!state.filter.RAM.length || state.filter.RAM.includes(item.RAM))&&
        (!state.filter.memory.length || state.filter.memory.includes(item.memory))
      )          
    },
    filteredRAMs: (state,getters) => { //filter without RAMs
      if(getters.isFilterEmpty) return state.products
      return state.products.filter(item => 
        (!state.filter.title || 
          item.title.toLowerCase().split(' ').join('').includes(state.filter.title)) &&
        (state.filter.minPrice === null || +item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === null || +item.price <= state.filter.maxPrice) &&
        (state.filter.category === null || item.category === state.filter.category) &&
        (!state.filter.year.length || state.filter.year.includes(item.year)) &&
        (!state.filter.color.length || state.filter.color.includes(item.color)) &&
        (!state.filter.memory.length || state.filter.memory.includes(item.memory))
      )        
    },
    filteredMemory: (state,getters) => { //filter without memory
      if(getters.isFilterEmpty) return state.products
      return state.products.filter(item => 
        (!state.filter.title || 
          item.title.toLowerCase().split(' ').join('').includes(state.filter.title)) &&
        (state.filter.minPrice === null || +item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === null || +item.price <= state.filter.maxPrice) &&
        (state.filter.category === null || item.category === state.filter.category) &&
        (!state.filter.year.length || state.filter.year.includes(item.year)) &&
        (!state.filter.color.length || state.filter.color.includes(item.color))&&
        (!state.filter.RAM.length || state.filter.RAM.includes(item.RAM))
      )        
    },
    colorArray: (state,getters) => { //all colors
      let allColors = []
      let processedColors = []

      state.products.forEach(item => {
        if(!allColors.includes(item.color)) allColors.push(item.color) 
      })
      allColors.sort()
      
      allColors.forEach(currentColor=>{
        let isColorInList = getters.filteredColors.find(filteredItem =>
          (filteredItem.color == currentColor) || state.filter.color.includes(currentColor))
        if(isColorInList) processedColors.push({color:currentColor,isDisabled:false})
        else processedColors.push({color:currentColor,isDisabled:true})
      })
      return processedColors
    },
    yearArray: (state,getters) => { //all years
      let allYears = []
      let processedYears = []
    
      state.products.forEach(item => {
          if(!allYears.includes(+item.year)) allYears.push(+item.year) 
      })
      allYears.sort((a,b)=> b-a)
      
      allYears.forEach(currentYear=>{
          let isYearInList = getters.filteredYears.find(filteredItem => 
            (filteredItem.year == currentYear) || state.filter.year.includes(currentYear))
          if(isYearInList) processedYears.push({year:currentYear,isDisabled:false})
          else processedYears.push({year:currentYear,isDisabled:true})
      })
      return processedYears
    },
    RAM_Array: (state,getters) => { //all RAMs
      let allRAMs = []
      let processedRAMs = []
    
      state.products.forEach(item => {
          if(!allRAMs.includes(item.RAM)) allRAMs.push(item.RAM) 
      })
      allRAMs.sort((a,b)=> b-a)
      
      allRAMs.forEach(currentRAM=>{
          let isRAMInList = getters.filteredRAMs.find(filteredItem =>
            (filteredItem.RAM == currentRAM) || state.filter.RAM.includes(currentRAM))
          if(isRAMInList) processedRAMs.push({RAM:currentRAM,isDisabled:false})
          else processedRAMs.push({RAM:currentRAM,isDisabled:true})
      })
      return processedRAMs
    },
    memoryArray: (state,getters) => { //all memory
      let allMemory = []
      let processedMemory = []
    
      state.products.forEach(item => {
          if(!allMemory.includes(item.memory)) allMemory.push(item.memory) 
      })
      allMemory.sort((a,b)=> b-a)
      
      allMemory.forEach(currentMemory=>{
          let isMemoryInList = getters.filteredMemory.find(filteredItem =>
            (filteredItem.memory == currentMemory) || state.filter.memory.includes(currentMemory))
          if(isMemoryInList) processedMemory.push({memory:currentMemory,isDisabled:false})
          else processedMemory.push({memory:currentMemory,isDisabled:true})
      })
      return processedMemory
    },
  }
})

export default store