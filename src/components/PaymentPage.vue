<template>
  <div>
    <div id="search-box">
      <v-autocomplete
        v-model="search_location"
        readonly
        prepend-inner-icon="mdi-map-marker"
        append-icon="mdi-lock"
        solo
        :label="search_location"
        :placeholder="search_location"
        color="deep-purple accent-3"
      ></v-autocomplete>
    </div>
    <div id="container">
      <v-card elevation="10" class="pt-10 pl-5 pr-5">
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Acquired Slots</p>
          </div>
          <div>
            <p class="font-weight-bold">{{ no_of_slots }} {{ no_of_slots > 1 ? "(Slots)" : "(Slot)" }}</p>
          </div>
        </div>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Estimated Duration</p>
          </div>
          <div>
            <p class="font-weight-bold">{{ no_of_hours }} {{ no_of_hours > 1 ? "(Hrs)" : "(Hr)" }}</p>
          </div>
        </div>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Time:</p>
          </div>
          <div>
            <p class="font-weight-bold">
              <v-icon class="mb-1">mdi-clock </v-icon>
              {{ check_in_time }}
            </p>
          </div>
        </div>

        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Date:</p>
          </div>
          <div>
            <p class="font-weight-bold">
              <v-icon class="mb-1">mdi-calendar </v-icon>
              {{ check_in_date }}
            </p>
          </div>
        </div>
        <v-divider />
        <div class="hz-align mt-4">
          <div>
            <p class="font-weight-bold text-h5">Total Fee</p>
          </div>
          <div>
            <p class="font-weight-bold text-h5">₹ {{ amount }}</p>
          </div>
        </div>
      </v-card>
    </div>

    <div id="container-bottom">
      <v-btn
        id="book-btn"
        @click="makePayment"
        class="mb-12"
        large
        dark
        color="deep-purple accent-3"
      >
        Make Payment
      </v-btn>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="370">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="display: none" v-bind="attrs" v-on="on"> </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5"> </v-card-title>
            <v-card-text>
              <div id="booked-div" v-if="spot_booked">
                <img src="../assets/tick.svg" alt="" />
                <p class="text-h5">
                  {{ no_of_slots > 1 ? "Slots" : "Slot" }} Successfully Booked
                </p>
                <p>Notifying Security Guards</p>
              </div>
              <div id="booked-div" v-if="!spot_booked">
                <v-icon color="red" class="text-h1 mb-4"
                  >mdi-close-circle</v-icon
                >
                <p class="text-h5">Error while Booking :(</p>
                <p>Please Retry!</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple accent-3" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      search_location: "Lekki Gardens Car Park",
      no_of_slots: 3,
      no_of_hours: 10,
      check_in_time: "15:06",
      check_in_date: "2020-06-01",
      spot_booked: false,
      dialog: false,
      amount: 100,
      razorpay_payment_id: null,
    };
  },
  methods: {
    makePayment() {
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY_ID,
        amount: this.amount * 100, // 1000 paise = INR 10
        name: "CAR PARK",
        description:
          "Booking " +
          this.no_of_slots +
          (this.no_of_slots > 1 ? " Slots " : " Slot ") +
          "for " +
          this.no_of_hours +
          (this.no_of_hours >= 10 ? " hours " : " hour"),
        image: "https://tinyurl.com/4bcy9a3y",
        handler: (response) => this.onPaymentSuccess(response),
        prefill: {
          name: this.$store.state.user.name,
          email: this.$store.state.user.email,
          contact: this.$store.state.user.phone,
        },
        theme: {
          color: "#651FFF",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (error) => this.onPaymentFailure(error));
    },
    onPaymentSuccess(response) {
      this.spot_booked = true;
      this.dialog = true;
      this.razorpay_payment_id = response.razorpay_payment_id;
    },
    onPaymentFailure(response) {
      this.razorpay_payment_id = null;
      this.spot_booked = false;
      this.dialog = true;
      console.log(response);
    },
  },
  mounted() {},
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#search-box {
  position: absolute;
  top: 10%;
  z-index: 2;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
#container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
#container-bottom {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  display: block;
  padding-left: 20px;
  padding-right: 20px;
}
#book-btn {
  width: 100%;
}
#booked-div {
  margin: 0 auto;
  display: block;
  text-align: center;
}
.hz-align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
