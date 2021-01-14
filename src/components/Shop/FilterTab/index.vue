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
          <input v-model="minPrice" type="number" class="input"/>
          <hr>
          <input v-model="maxPrice" type="number" class="input"/>
        </div>
        <b-slider v-model="numbers" :min="this.minPrice" :max="this.maxPrice" :step="1000" class="price-slider">
        </b-slider>
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
        :key="item.year" 
        v-model="selectedYears"
        :native-value="item.year"
        :disabled="item.isDisabled">
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
        <div class="title">Оперативна пам'ять</div>
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
        <div class="title">Пам'ять</div>
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
      maxPrice: null,
      minPrice: null,
      numbers:[this.minPrice,this.maxPrice],
    };
  },

  watch: {
    minPrice(val) {
      this.numbers[0] = val;
      this.setFilterData({ minPrice: val || null });
    },

    maxPrice(val) {
      this.numbers[1] = val;
      this.setFilterData({ maxPrice: val || null });
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
    ...mapGetters(['products','colorArray','yearArray','categoriesArray','RAM_Array','memoryArray']),
  },

  methods: {
    ...mapActions(["setFilterData"]),

    closeTab(el) { 
      this[el] = !this[el]
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 30px;
  padding-top: 30px;
  padding-right: 20px;
  width: 100%;
  background-color: #f2f2f2;
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

.angle-down{
  cursor: pointer;
  transform: rotate(180deg);
  font-size: 25px;
  font-weight: normal;
  &:hover {
    opacity: 0.8;
    transition-delay: 0.1s
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

</style>
