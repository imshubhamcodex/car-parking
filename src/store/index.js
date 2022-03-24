import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: "Shubham Kumar",
      email: "edwssm777@gmail.com",
      phone: "8018439472",
      password: "12345678",
    },
    location_list: [
      {
        name: "Lekki Gardens Car Park",
        rating: 2,
        spot_avail: 20,
        fee_per_hour: 1,
        location_id: "loc1",
      },
      {
        name: "Josh's Ground Car Park",
        rating: 5,
        spot_avail: 5,
        fee_per_hour: 2,
        location_id: "loc2",
      },
      {
        name: "Boss Gardens Car Park",
        rating: 4.5,
        spot_avail: 2,
        fee_per_hour: 3,
        location_id: "loc3",
      },
    ],
    favorite_list: [
      {
        name: "Josh's Ground Car Park",
        rating: 5,
        spot_avail: 5,
        fee_per_hour: 2,
        location_id: "loc2",
      },
      {
        name: "Boss Gardens Car Park",
        rating: 4.5,
        spot_avail: 2,
        fee_per_hour: 3,
        location_id: "loc3",
      },
    ],

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
  },
});
