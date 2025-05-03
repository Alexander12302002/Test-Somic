<script setup>
import SideMenu from './components/Side_menu.vue'
</script>

<template>
  <div class="app-container">
    <div class="side_menu">
      <SideMenu/>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style> 
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container{
  height: 100vh;
  width: 100vw;
  display: flex;
}

.side_menu{
  width: 20vw;
  height: 100vh;
}

.container{
  width: 80vw;
  height: 100vh;
}
</style>
