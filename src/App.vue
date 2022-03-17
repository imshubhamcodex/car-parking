<template>
  <div id="app">
    <v-app>
      <router-view />
      <v-btn
        @click="nextRoute"
        style="position: absolute; bottom: 0; z-index: 999; width: 100vw"
        color="red"
      >
        next</v-btn
      >
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: "/",
        },
        {
          path: "/onboarding",
        },
        {
          path: "/login",
        },
        {
          path: "/signup",
        },
        {
          path: "/home",
        },
        {
          path: "/booking",
        },
        {
          path: "/payment",
        },
        {
          path: "/booking-details",
        },
      ],
      currentRoute: 0,
    };
  },
  methods: {
    nextRoute() {
      if (this.currentRoute >= this.routes.length-1) {
        this.currentRoute = 3;
      }
      this.$router.push(this.routes[this.currentRoute + 1].path);
      this.currentRoute++;
    },
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
body {
  overflow-y: hidden;
}
</style>
