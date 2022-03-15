<template>
  <div id="app">
  <v-app>
  <Splash />
  </v-app>
    
  </div>
</template>

<script>
import Splash from "./components/Onboarding.vue";

export default {
  name: "App",
  components: {
    Splash,
  },
};
</script>

<style></style>
