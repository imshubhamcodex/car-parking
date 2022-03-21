import Vue from "vue";
import VueRouter from "vue-router";
//Components
import splash from "../components/Splash.vue";
import onboarding from "../components/Onboarding.vue";
import login from "../components/LoginBox.vue";
import signup from "../components/SignUpBox.vue";
import home from "../components/Home.vue";
import booking from "../components/Booking.vue";
import payment from "../components/PaymentPage.vue";
import bookingDetails from "../components/BookingDetails.vue";
import page_not_found from "../components/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: splash,
  },
  {
    path: "/onboarding",
    component: onboarding,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/signup",
    component: signup,
  },
  {
    path: "/home",
    component: home,
  },
  {
    path: "/booking",
    component: booking,
  },
  {
    path: "/payment",
    component: payment,
  },
  {
    path: "/booking-details",
    component: bookingDetails,
  },
  {
    path: "*",
    component: page_not_found,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
