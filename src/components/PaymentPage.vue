<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/secure.svg" />
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
      <v-card elevation="10" class="pt-10 pl-5 pr-5">
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">Acquired Slots</p>
          </div>
          <div>
            <p class="font-weight-bold">
              {{ no_of_slots }} {{ no_of_slots > 1 ? "(Slots)" : "(Slot)" }}
            </p>
          </div>
        </div>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">
              {{
                extended_hours.length > 0
                  ? "Extended Duration"
                  : "Estimated Duration"
              }}
            </p>
          </div>
          <div>
            <p class="font-weight-bold">
              {{
                extended_hours.length > 0
                  ? extended_hours[extended_hours.length - 1]
                  : no_of_hours
              }}
              {{
                no_of_hours > 1 ||
                (extended_hours.length > 0 &&
                  extended_hours[extended_hours.length - 1] > 1)
                  ? "(Hrs)"
                  : "(Hr)"
              }}
            </p>
          </div>
        </div>
        <div class="hz-align">
          <div>
            <p class="font-weight-bold">
              {{
                extended_hours.length > 0 ? "Checked-in At" : "Check-in Time"
              }}
            </p>
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
            <p class="font-weight-bold">
              {{
                extended_hours.length > 0 ? "Checked-in On" : "Check-in Date"
              }}
            </p>
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
            <p class="font-weight-bold text-h5">
              ₹
              {{
                extended_hours.length > 0
                  ? extended_hours_payment_amount[
                      extended_hours_payment_amount.length - 1
                    ]
                  : amount
              }}
            </p>
          </div>
        </div>
      </v-card>
    </div>

    <div id="container-bottom" class="g-animi">
      <v-btn
        id="book-btn"
        @click="makePayment"
        class="mb-10"
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
                <p class="text-h5 mt-3">
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
              <v-btn
                color="deep-purple accent-3"
                text
                @click="goToBookingsDetails"
              >
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
import firebase from "firebase";
import gsap from "gsap";
export default {
  data() {
    return {
      search_location: null,
      no_of_slots: 0,
      no_of_hours: 0,
      check_in_time: "",
      check_in_date: "",
      spot_booked: false,
      dialog: false,
      amount: 0,
      razorpay_payment_id: null,
      extended_hours: [],
      extended_hours_payment_id: [],
      extended_hours_payment_amount: [],
    };
  },
  methods: {
    goToBookingsDetails() {
      this.dialog = false;
      if (this.razorpay_payment_id !== null) {
        this.$router.push("/booking-details");
      } else {
        this.$router.push("/home");
      }
    },
    makePayment() {
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY_ID,
        amount:
          this.extended_hours.length > 0
            ? this.extended_hours_payment_amount[
                this.extended_hours_payment_amount.length - 1
              ] * 100
            : this.amount * 100, // 100 paise = INR 1
        name: "CAR PARK",
        description:
          "Booking " +
          this.no_of_slots +
          (this.no_of_slots > 1 ? " Slots " : " Slot ") +
          "for " +
          (this.extended_hours.length > 0
            ? this.extended_hours[this.extended_hours.length - 1] +
              (this.extended_hours[this.extended_hours.length - 1] > 1
                ? " Hours"
                : " Hour")
            : this.no_of_hours + (this.no_of_hours > 1 ? " Hours" : " Hour")),
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
      if (this.extended_hours.length === 0) {
        this.spot_booked = true;
        this.dialog = true;
        this.razorpay_payment_id = response.razorpay_payment_id;
        this.$store.commit("setPaymentID", response.razorpay_payment_id);
        this.$store.commit("setPaymentAmount", this.amount);
        this.$store.commit("setUpcomingList");
        this.updateSpotStatus();
        this.updateUpcomingListInDB();
      } else {
        this.extended_hours_payment_id.push(response.razorpay_payment_id);
        this.$store.commit("setInProgressList", {
          no_of_slots: this.$store.state.booking_details.no_of_slots,
          no_of_hours: this.$store.state.booking_details.no_of_hours,
          check_in_time: this.$store.state.booking_details.check_in_time,
          check_in_date: this.$store.state.booking_details.check_in_date,
          location: this.$store.state.booking_details.location,
          location_id: this.$store.state.booking_details.location_id,
          payment_id: this.$store.state.booking_details.payment_id,
          payment_amount: this.$store.state.booking_details.payment_amount,
          rating: this.$store.state.booking_details.rating,
          extended_hours: this.$store.state.booking_details.extended_hours,
          extended_hours_payment_id: this.extended_hours_payment_id,
          extended_hours_payment_amount:
            this.$store.state.booking_details.extended_hours_payment_amount,
        });

        this.updateInprogressListInDB();
        this.spot_booked = true;
        this.dialog = true;
        console.log(this.$store.state.inprogress_list);
      }
    },
    onPaymentFailure(response) {
      this.razorpay_payment_id = null;
      this.spot_booked = false;
      this.dialog = true;
      console.log(response);
    },
    async updateSpotStatus() {
      const location = this.$store.state.locked_location;
      const location_id = location.location_id;
      await firebase
        .firestore()
        .collection("location_list")
        .doc(location_id)
        .update(
          {
            [location_id]: {
              name: location.name,
              rating: location.rating,
              spot_avail: location.spot_avail - this.no_of_slots,
              location_id: location_id,
              fee_per_hour: location.fee_per_hour,
              booking_allowed:
                location.spot_avail - this.no_of_slots <= 0
                  ? false
                  : location.booking_allowed,
            },
          },
          { merge: true }
        )
        .catch((error) =>
          alert("Error while updating spot status: " + error.message)
        );
    },
    async updateUpcomingListInDB() {
      await firebase
        .firestore()
        .collection("upcoming_list")
        .doc(this.$store.state.user.user_id)
        .set(
          {
            list: this.$store.state.upcomimg_list,
          },
          { merge: true }
        )
        .catch((error) =>
          alert("Error while updating upcoming list: " + error.message)
        );
    },
    async updateInprogressListInDB() {
      await firebase
        .firestore()
        .collection("inprogress_list")
        .doc(this.$store.state.user.user_id)
        .set({
          list: this.$store.state.inprogress_list,
        })
        .catch((error) =>
          alert("Error while updating inprogress list: " + error.message)
        );
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

    if (this.$store.state.booking_details.extended_hours.length === 0)
      this.$store.commit("setPaymentID", null);

    let location_list = this.$store.state.location_list;
    this.search_location = this.$store.state.booking_details.location;
    let fee_per_hour =
      location_list[
        location_list.findIndex((item) => item.name === this.search_location)
      ].fee_per_hour;
    this.no_of_slots = this.$store.state.booking_details.no_of_slots;
    this.amount = this.$store.state.booking_details.no_of_hours * fee_per_hour;
    this.check_in_time = this.$store.state.booking_details.check_in_time;
    this.check_in_date = this.$store.state.booking_details.check_in_date;
    this.no_of_hours = this.$store.state.booking_details.no_of_hours;

    if (this.$store.state.booking_details.extended_hours.length > 0) {
      this.extended_hours = this.$store.state.booking_details.extended_hours;
      this.extended_hours_payment_id =
        this.$store.state.booking_details.extended_hours_payment_id;
      this.extended_hours_payment_amount =
        this.$store.state.booking_details.extended_hours_payment_amount;
    }
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
  bottom: 0;
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
