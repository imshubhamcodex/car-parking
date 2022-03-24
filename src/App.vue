<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<style>
.v-carousel__controls__item {
  height: 0px !important;
  width: 0px !important;
  opacity: 0 !important;
}
.v-rating > button {
  margin-right: -15px !important;
}
body {
  overflow-y: hidden;
}
html,
body {
  height: 100%;
  overscroll-behavior: contain;
}
</style>
