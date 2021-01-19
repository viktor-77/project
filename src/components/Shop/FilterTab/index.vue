<template>
  <div class="container">
    <div class="section"> <!--Category-->
      <div class="heading">
        <div class="title">Категорія</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('categoryBlockClicked')"
        :class="{clicked: categoryBlockClicked}" />
      </div>
      <div v-if="!categoryBlockClicked">
        <b-select v-model="category">
          <option v-for="item in categoriesArray" :key="item">
            {{ item }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="section"> <!--Price-->
      <div class="heading">
        <div class="title">Ціна</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('priceBlockClicked')"
        :class="{clicked: priceBlockClicked}" />
      </div>    
      <div class="price" v-if="!priceBlockClicked">
        <div class="price-input">
          <input v-model.number="minPrice" type="number" class="input" min="1" :class="{priceInputError: priceInputError}" placeholder="Min"/>
          <hr>
          <input v-model.number="maxPrice" type="number" class="input" :class="{priceInputError: priceInputError}" placeholder="Max"/>
        </div>
        <!-- <b-slider v-model="priceRange" :step="100" class="price-slider">
        </b-slider> -->
      </div>
    </div>
    <div class="section"> <!--Year-->
      <div class="heading">
        <div class="title">Рік</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('yearBlockClicked')"
        :class="{clicked: yearBlockClicked}" />
      </div>
      <div class="list" v-if="!yearBlockClicked">
        <b-checkbox v-for="item in yearArray"  
        :disabled="item.isDisabled"
        :key="item.year" 
        v-model="selectedYears"
        :native-value="item.year"
        >
        {{item.year}}
        </b-checkbox>
      </div>
    </div>
    <div class="section"> <!--Color-->
      <div class="heading">
        <div class="title">Колір</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('colorBlockClicked')" 
        :class="{clicked: colorBlockClicked}"/>
      </div>
      <div class="list" v-if="!colorBlockClicked">
        <b-checkbox v-for="item in colorArray"
        :key="item.color" 
        v-model="selectedColors"
        :native-value="item.color"
        :disabled="item.isDisabled">
        {{item.color}}
        </b-checkbox>
      </div>      
    </div>
    <div class="section"> <!--RAM-->
      <div class="heading">
        <div class="title">Оперативна <br> пам'ять</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('RAM_BlockClicked')" 
        :class="{clicked: RAM_BlockClicked}"/>
      </div>
      <div class="list" v-if="!RAM_BlockClicked">
        <b-checkbox v-for="item in RAM_Array"
        :key="item.RAM" 
        v-model="selectedRAMs"
        :native-value="item.RAM"
        :disabled="item.isDisabled">
        {{item.RAM +' '+'ГБ'}}
        </b-checkbox>
      </div>      
    </div>
    <div class="section"> <!--Memory-->
      <div class="heading">
        <div class="title">Внутрішня <br> пам'ять</div>
        <i class="fas fa-angle-down angle-down" @click="closeTab('memoryBlockClicked')" 
        :class="{clicked: memoryBlockClicked}"/>
      </div>
      <div class="list" v-if="!memoryBlockClicked">
        <b-checkbox v-for="item in memoryArray"
        :key="item.memory" 
        v-model="selectedMemory"
        :native-value="item.memory"
        :disabled="item.isDisabled">
        {{item.memory +' '+'ГБ'}}
        </b-checkbox>
      </div>      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FilterTab",

  data() {
    return {
      categoryBlockClicked: false,
      priceBlockClicked: false,
      yearBlockClicked: false,
      colorBlockClicked: false,
      RAM_BlockClicked: false,
      memoryBlockClicked: false,

      selectedYears: [],
      selectedColors: [],
      selectedRAMs: [],
      selectedMemory: [],
      
      category: null,
      minPrice: null,
      maxPrice: null,
      // priceRange:[this.minPrice,this.maxPrice],
      priceInputError: false
    };
  },

  watch: {
    minPrice(val) {
      if(this.minPrice > this.maxPrice) this.priceInputError = true
      else {
        this.setFilterData({ minPrice: val || null });
        this.priceInputError = false
      }
    },

    maxPrice(val) {
      if(this.minPrice > this.maxPrice) this.priceInputError = true
      else {
        this.setFilterData({ maxPrice: val || null });
        this.priceInputError = false
      }
    },

    // numbers(Old, New) {
    //   if(Old[0]!= New[0]) {this.setFilterData({ minPrice: New[0] || null });}
    //   if(Old[1]!= New[1]) {this.setFilterData({ maxPrice: New[1] || null });}
    // },

    category(val) {
      if (val == "Усі категорії") val = null;
      this.selectedColors = [];
      this.selectedYears = [];
      this.minPrice = 0;
      this.setFilterData({ category: val });
    },

    selectedYears(val) {
      this.setFilterData({ year: val });
    },

    selectedColors(val) {
      this.setFilterData({ color: val });
    },

    selectedRAMs(val) {
      this.setFilterData({ RAM: val });
    },

    selectedMemory(val) {
      this.setFilterData({ memory: val });
    },
  },

  computed: {
    ...mapGetters(['products','colorArray','yearArray','categoriesArray','RAM_Array','memoryArray','filteredProducts']),

    maxFilteredPrice() {
      let max = 0;
      this.filteredProducts.forEach(el => {
        if(max < el.price) max = el.price
      });
      return max
    },

    minFilteredPrice() {
      let min = 9999999999;
      this.filteredProducts.forEach(el => {
        if(min > el.price) min = el.price
      });
      return min
    }
  },

  mounted () {
    this.loadData().then(()=>{
      this.maxPrice = this.maxFilteredPrice
      this.minPrice = this.minFilteredPrice
    })
  },
  
  methods: {
    ...mapActions(["setFilterData",'loadData']),

    closeTab(el) { 
      this[el] = !this[el]
    },
    // maxFilteredPrice() {
    //   let max = 0;
    //   this.filteredProducts.forEach(el => {
    //     if(max < el.price) max = el.price
    //   });
    //   return max
    // },
    // minFilteredPrice() {
    //   let min = 9999999999;
    //   this.filteredProducts.forEach(el => {
    //     if(min > el.price) min = el.price
    //   });
    //   return min
    // }
  },
  
};

</script>

<style lang="scss">
  .check:hover {
    transform: scale(1.1);
  }
</style>

<style lang="scss" scoped>
.container {
  padding-left: 30px;
  padding-top: 30px;
  padding-right: 20px;
  width: 100%;
  background-color: #f0f0f0;
}

.section {
  margin-bottom: 30px;
  padding: 0;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  text-transform: none;
}

.title {
  text-align: left;
  color: #4a4a4a;
  font-size: 18px;
  margin:  0 -8px;
  margin-bottom: 0 !important;
  max-width: 200px;
}

i{
  cursor: pointer;
  transform: rotate(180deg);
  font-size: 30px;
  font-weight: normal;
  &:hover {
    opacity: 0.8;
    transition-delay: 0.05s;
  }
}

.price-input {
  display: grid;
  grid-template-columns:100px 12px 100px;
  grid-gap: 10px;
  align-items: center;
  font-size: 40px;
  hr {
    background: #363636;
    height: 1.5px;
  }
  input {
  width: 100px;
  }
}

.price-slider{
  width: 220px;
  margin-left: 6px;
}

.list {
  display: grid;
  grid-gap: 7px;
}

.clicked {
  transform: rotate(0deg);
}

.priceInputError {
  border: 1px solid #f84147;
  background-color: rgba(248, 65, 71, 0.25);
}
</style>
