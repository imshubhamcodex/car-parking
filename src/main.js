import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/includes/vuetify";
import router from "./router";
import store from "./store";
import firebase from "firebase";
Vue.config.productionTip = false;

// Firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "car-park-ae74b.firebaseapp.com",
  projectId: "car-park-ae74b",
  storageBucket: "car-park-ae74b.appspot.com",
  messagingSenderId: "22514751716",
  appId: "1:22514751716:web:806d75d181b4ae791ff4f1",
  measurementId: "G-FNJFZ3YGYY",
};
firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  store,
}).$mount("#app");
