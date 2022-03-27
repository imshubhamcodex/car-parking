<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  async created() {
    await firebase
      .firestore()
      .collection("location_list")
      .get()
      .then((res) => {
        let location_list = [];
        const list_obj = res.docs.map((doc) => doc.data());
        list_obj.forEach((item) => {
          location_list.push(Object.values(item)[0]);
        });
        this.$store.commit("setLocationList", location_list);
      });
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
html,
body {
  height: 100%;
  overscroll-behavior: contain;
}
</style>
