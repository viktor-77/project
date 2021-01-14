<template>
  <div id="app">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous">
    <shop/>
  </div>
</template>

<script>
import Shop from "./components/Shop";

export default {
  name: 'App',
  components: {
    Shop
  }
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

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
