<template>
  <div id="app">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">
    <header-shop class="HeaderShop"/>
    <router-view></router-view>
    <footer-shop class="FooterShop"/>
  </div>
</template>

<script>
import FooterShop from "./components/FooterShop";
import HeaderShop from "./components/HeaderShop";

export default {
  name: 'App',
  
  components: {
    FooterShop,
    HeaderShop,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap'); 

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: montserrat, Helvetica, Arial, sans-serif;
}

input { /*delet input-nuber`s arrows*/ 
  text-align: center;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; 
}
input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
