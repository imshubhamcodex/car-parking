<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/man-payment.svg" />
    </div>
    <div id="search-box" class="g-animi">
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
    <div id="qrcode-div" class="g-animi">
      <canvas id="qrcode"></canvas>
      <p id="pay-id" class="mt-3">PAYMENT ID: {{ razorpay_payment_id }}</p>
    </div>
    <div id="container" class="g-animi">
      <v-card elevation="10" class="pt-3 pl-5 pr-5">
        <p class="font-weight-bold">BOOKING DETAILS</p>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Total Slots</p>
          </div>
          <div>
            <p class="font-weight-bold">
              {{ no_of_slots }} {{ no_of_slots > 1 ? "(Slots)" : "(Slot)" }}
            </p>
          </div>
        </div>

        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Duration</p>
          </div>
          <div>
            <p class="font-weight-bold">
              {{ no_of_hours }} {{ no_of_hours > 1 ? "(Hrs)" : "(Hr)" }}
            </p>
          </div>
        </div>

        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Time:</p>
          </div>
          <div>
            <p class="font-weight-bold">
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
              {{ check_in_date }}
            </p>
          </div>
        </div>
      </v-card>
    </div>

    <div id="container-bottom" class="g-animi">
      <v-btn
        id="book-btn"
        class="mb-6"
        large
        dark
        color="deep-purple accent-3"
        @click="backToHome"
      >
        Back to Home
      </v-btn>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import QRious from "qrious";
export default {
  data() {
    return {
      search_location: null,
      no_of_slots: 0,
      no_of_hours: 0,
      check_in_time: "00:00",
      check_in_date: "0000-00-00",
      razorpay_payment_id: null,
      extended_hours: [],
      extended_hours_payment_id: [],
      extended_hours_payment_amount: [],
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/home");
    },
    generateQR() {
      new QRious({
        element: document.getElementById("qrcode"),
        value: this.getValue(),
        level: "H",
        size: 140,
      });
    },
    getValue() {
      if (this.$store.state.booking_details.extended_hours.length === 0) {
        return this.razorpay_payment_id;
      } else {
        let newValue = "";
        for (let i = 0; i < this.extended_hours.length; i++) {
          newValue +=
            this.extended_hours_payment_id[i] +
            "-" +
            this.extended_hours_payment_amount[i] +
            "-" +
            this.extended_hours[i] +
            "/";
        }
        return newValue + ":" + this.razorpay_payment_id+"=Expired";
      }
    },
  },
  mounted() {
    gsap.from(".g-animi", {
      opacity: 0,
      x: -50,
      duration: 0.5,
      stagger: 0.2,
    });

    let booking_details = this.$store.state.booking_details;
    this.no_of_slots = booking_details.no_of_slots;
    this.no_of_hours = booking_details.no_of_hours;
    this.check_in_time = booking_details.check_in_time;
    this.check_in_date = booking_details.check_in_date;
    this.search_location = booking_details.location;
    this.razorpay_payment_id = booking_details.payment_id;
    if (this.$store.state.booking_details.extended_hours.length > 0) {
      this.extended_hours = this.$store.state.booking_details.extended_hours;
      this.extended_hours_payment_id =
        this.$store.state.booking_details.extended_hours_payment_id;
      this.extended_hours_payment_amount =
        this.$store.state.booking_details.extended_hours_payment_amount;
    }

    this.generateQR();
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#background-map-div {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}
#background-map-div > img {
  margin: 100% auto;
  width: 100%;
  display: block;
}
#qrcode-div {
  z-index: 5;
  height: 150px;
  width: 100%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#search-box {
  position: absolute;
  top: 20px;
  z-index: 2;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
#container {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
#container-bottom {
  position: fixed;
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
#pay-id {
  margin-top: 25px !important;
}

@media (max-height: 650px) {
  #pay-id {
    margin-top: 0px !important;
  }
}
</style>
