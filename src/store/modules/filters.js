import products from "./products";

export default {
  namespaced: true,

  state: {
    ...products.state,
    
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
  },

  mutations: {
    setFilterData(state,item) {
      state.filter = {
        ...state.filter,         
        ...item
    }},
  },

  actions: {
    setFilterData({commit}, item) {
      commit('setFilterData', item)
    },
  },

  getters: {
    categoriesArray: (state) => { //all kind of categories
      let categories = ["Усі категорії"]
      state.productsList.forEach(item => {
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
      if(getters.isFilterEmpty) return state.productsList
      return state.productsList.filter(item =>
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
      if(getters.isFilterEmpty) return state.productsList
      return state.productsList.filter(item =>
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
      if(getters.isFilterEmpty) return state.productsList
      return state.productsList.filter(item => 
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
      if(getters.isFilterEmpty) return state.productsList
      return state.productsList.filter(item => 
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
      if(getters.isFilterEmpty) return state.productsList
      return state.productsList.filter(item => 
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

      state.productsList.forEach(item => {
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
    
      state.productsList.forEach(item => {
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
    
      state.productsList.forEach(item => {
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
    
      state.productsList.forEach(item => {
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
  },
}
