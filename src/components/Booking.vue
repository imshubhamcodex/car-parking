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
            <p class="font-weight-bold">Number of Slots</p>
          </div>
          <div>
            <p class="font-weight-bold">{{ no_of_slots }} (Slots)</p>
          </div>
        </div>
        <div>
          <v-slider
            v-model="no_of_slots"
            step="1"
            ticks="always"
            tick-size="4"
            :max="maxBookingSlots"
            color="deep-purple accent-3"
          ></v-slider>
        </div>
        <div class="hz-align">
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
            tick-size="4"
            :max="24"
            color="deep-purple accent-3"
          ></v-slider>
        </div>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Time:</p>
          </div>
          <div>
            <p class="font-weight-bold" @click="openTimeDialog">
              <v-icon class="mb-1">mdi-clock-edit-outline </v-icon>
              {{ check_in_time }}
            </p>
          </div>
        </div>

        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Check-in Date:</p>
          </div>
          <div>
            <p class="font-weight-bold" @click="openDateDialog">
              <v-icon class="mb-1">mdi-calendar-edit </v-icon>
              {{ check_in_date }}
            </p>
          </div>
        </div>
      </v-card>
    </div>

    <div id="container-bottom">
      <v-btn
        id="book-btn"
        @click="bookSpace"
        class="mb-12"
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
export default {
  data() {
    return {
      search_location: "",
      maxBookingSlots: 0,
      no_of_slots: 0,
      no_of_hours: 0,
      check_in_time: "",
      check_in_date: "",
      showTime: false,
      showDate: false,
      dialog: false,
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
        payment_id: null,
        rating: this.$store.state.locked_location.rating,
      });

      this.$router.push("/payment");
    },
  },
  mounted() {
    this.search_location = this.$store.state.locked_location.name;
    this.maxBookingSlots =
      this.$store.state.locked_location.spot_avail > 5
        ? 5
        : this.$store.state.locked_location.spot_avail;
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#search-box {
  position: absolute;
  top: 15%;
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
