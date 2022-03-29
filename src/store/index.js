import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    location_list: [],
    favorite_list: [],
    history_list: [],
    upcomimg_list: [],
    inprogress_list: [],
    locked_location: {},
    booking_details: {},
  },
  mutations: {
    lockLocation(state, payload) {
      state.locked_location = payload;
    },
    setPaymentID(state, payload) {
      state.booking_details.payment_id = payload;
    },
    setPaymentAmount(state, payload) {
      state.booking_details.payment_amount = payload;
    },
    setBookingsDetails(state, payload) {
      state.booking_details = payload;
    },
    setUpcomingList(state) {
      state.upcomimg_list.unshift(state.booking_details);
    },
    setFavList(state, payload) {
      state.favorite_list = payload;
    },
    setInProgressList(state, payload) {
      state.inprogress_list.forEach((item, index) => {
        if (item.payment_id == payload.payment_id) {
          state.inprogress_list.splice(index, 1);
        }
      });
      state.inprogress_list.unshift(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLocationList(state, payload) {
      state.location_list = payload;
    },
    setUpcomingListFromDB(state, payload) {
      state.upcomimg_list = payload;
    },
    setInProgressListFromDB(state, payload) {
      state.inprogress_list = payload;
    },
    setHistoryListFromDB(state, payload) {
      state.history_list = payload;
    },
  },
});
