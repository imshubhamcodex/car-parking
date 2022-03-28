<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/car-girl.svg" />
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
    <div id="container" class="g-animi">
      <v-card elevation="10" class="pt-5 pl-5 pr-5">
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Time:</p>
          </div>
          <div>
            <v-btn fab x-small class="font-weight-bold" @click="openTimeDialog">
              <v-icon>mdi-clock-edit-outline </v-icon>
            </v-btn>
            {{ check_in_time }}
          </div>
        </div>

        <div class="hz-align mt-3">
          <div>
            <p class="font-weight-bold">Check-in Date:</p>
          </div>
          <div>
            <v-btn fab x-small class="font-weight-bold" @click="openDateDialog">
              <v-icon>mdi-calendar-edit </v-icon>
            </v-btn>
            {{ check_in_date }}
          </div>
        </div>
        <div class="hz-align mt-2">
          <div>
            <p class="font-weight-bold">Estimate Duration</p>
          </div>
          <div>
            <p class="font-weight-bold">{{ no_of_hours }} (Hrs.)</p>
          </div>
        </div>
        <div>
          <v-slider
            v-model="no_of_hours"
            step="1"
            ticks="always"
            tick-size="1"
            :max="96"
            color="deep-purple accent-3"
          ></v-slider>
        </div>
        <div class="mt-n2 pb-1">
          <v-divider></v-divider>

          <p class="mt-4 font-weight-bold">
            <span class="mr-1"
              ><v-icon
                class="mt-n1"
                :color="booking_allowed ? 'green' : 'red'"
                >{{
                  booking_allowed ? "mdi-check-decagram" : "mdi-close-circle"
                }}</v-icon
              ></span
            >
            Booking
            {{ booking_allowed ? "Allowed" : "Not Allowed" }}
          </p>
        </div>
      </v-card>
    </div>

    <div id="container-bottom" class="g-animi">
      <v-btn
        id="book-btn"
        @click="bookSpace"
        class="mb-10"
        large
        :dark="!isDisabled()"
        :disabled="isDisabled()"
        color="deep-purple accent-3"
      >
        Book Space
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
              <v-time-picker
                v-if="showTime"
                v-model="check_in_time"
                ampm-in-title
              ></v-time-picker>

              <v-date-picker
                v-if="showDate"
                v-model="check_in_date"
                show-adjacent-months
                :min="new Date().toISOString().substr(0, 10)"
                :max="
                  new Date(new Date().getTime() + 345600000)
                    .toISOString()
                    .substr(0, 10)
                "
              ></v-date-picker>
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

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      search_location: "",
      no_of_slots: 1,
      no_of_hours: 0,
      check_in_time: "",
      check_in_date: "",
      showTime: false,
      showDate: false,
      dialog: false,
      booking_allowed: false,
    };
  },
  methods: {
    isDisabled() {
      if (
        this.no_of_slots <= 0 ||
        this.no_of_hours <= 0 ||
        this.check_in_time.trim() == "" ||
        this.check_in_date.trim() == ""
      ) {
        return true;
      }
      if (!this.booking_allowed) {
        return true;
      }
      return false;
    },
    openTimeDialog() {
      this.showTime = true;
      this.showDate = false;
      this.dialog = true;
    },
    openDateDialog() {
      this.showTime = false;
      this.showDate = true;
      this.dialog = true;
    },
    bookSpace() {
      this.$store.commit("setBookingsDetails", {
        no_of_slots: this.no_of_slots,
        no_of_hours: this.no_of_hours,
        check_in_time: this.check_in_time,
        check_in_date: this.check_in_date,
        location: this.search_location,
        location_id: this.$store.state.locked_location.location_id,
        rating: this.$store.state.locked_location.rating,
        payment_id: null,
        extended_hours: [],
        extended_hours_payment_id:[],
        extended_hours_payment_amount: [],
      });

      this.$router.push("/payment");
    },
  },
  mounted() {
    if (this.$store.state.user === null) {
      this.$router.push("/login");
      return;
    }

    gsap.from(".g-animi", {
      opacity: 0,
      x: -50,
      duration: 0.5,
      stagger: 0.2,
    });

    this.search_location = this.$store.state.locked_location.name;

    this.booking_allowed = this.$store.state.locked_location.booking_allowed;
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
#search-box {
  position: absolute;
  top: 40px;
  z-index: 2;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
#container {
  position: absolute;
  top: 45%;
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
</style>
