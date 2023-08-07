<template>
  <div>
    <Header id="header" @clicked="onClickChild"/>
    <component :is="currentView"/>
    <Footer id="footer" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/boarders/Header.vue'
import Welcome from './components/Welcome.vue'
import Data from './components/Data.vue'
import Footer from './components/boarders/Footer.vue'
import NotFound from './components/NotFound.vue'

const routes = {
  '/': Welcome,
  '/data': Data
}
const currentPath = ref(window.location.hash);
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
});
let searchData = "";

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

function onClickChild(value) {
  searchData = value
  console.log(searchData)
}
</script>

<style scoped>
#header {
  background-color: yellowgreen;
  padding: 2rem;
}

#footer {
  background-color: yellowgreen;
  padding: 2rem;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
