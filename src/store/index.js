import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    location_list: [],
    favorite_list: [],
    history_list: [
      {
        no_of_slots: 1,
        no_of_hours: 10,
        check_in_time: "10:00",
        check_in_date: "2020-06-01",
        location: "Lekki Gardens Car Park",
        location_id: "loc1",
        payment_id: "expired",
        payment_amount: 101,
        rating: 3,
      },
    ],
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
  },
});
