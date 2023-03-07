<script setup lang="ts"></script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Get Schwifty";
  src: local("get_schwifty"),
    url(@/common/fonts/get_schwifty.ttf) format("truetype");
}

.app {
  display: block;
}
</style>
