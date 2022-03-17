<template>
  <div id="app">
    <v-app>
      <Splash />
    </v-app>
  </div>
</template>

<script>
import Splash from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Splash,
  },
};
</script>

<style>
.v-carousel__controls__item {
  height: 0px !important;
  width: 0px !important;
  opacity: 0 !important;
}
.v-rating > button {
  margin-right: -15px !important;
}
</style>
