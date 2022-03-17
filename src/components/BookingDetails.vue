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
    <div id="qrcode-div">
      <canvas id="qrcode"></canvas>
      <p class="mt-3">PAYMENT ID: {{ razorpay_payment_id }}</p>
    </div>
    <div id="container">
      <v-card elevation="10" class="pt-3 pl-5 pr-5">
      <p class=" font-weight-bold">BOOKING DETAILS</p>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold" >Total Slots</p>
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

    <div id="container-bottom">
      <v-btn
        id="book-btn"
        class="mb-12"
        large
        dark
        color="deep-purple accent-3"
      >
        Back to Home
      </v-btn>
    </div>
  </div>
</template>

<script>
import QRious from "qrious";
export default {
  data() {
    return {
      search_location: "Lekki Gardens Car Park",
      no_of_slots: 5,
      no_of_hours: 10,
      check_in_time: "15:06",
      check_in_date: "2020-06-01",
      razorpay_payment_id: "hahaha",
    };
  },
  methods: {
    generateQR() {
      new QRious({
        element: document.getElementById("qrcode"),
        value: this.razorpay_payment_id,
        level: "H",
        size: 140,
      });
    },
  },
  mounted() {
    this.generateQR();
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#qrcode-div {
  z-index: 5;
  height: 150px;
  width: 100%;
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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
  top: 65%;
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
