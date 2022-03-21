<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/home-map.svg" />
    </div>
    <div id="search-box">
      <v-autocomplete
        v-model="search_location"
        :items="location_list_names"
        prepend-inner-icon="mdi-map-marker"
        solo
        label=" Where are you going ?"
        color="deep-purple accent-3"
      ></v-autocomplete>
    </div>

    <div
      v-if="location_list_names.includes(search_location) ? true : false"
      class="middle-div"
      id="selected-div"
    >
      <div>
        <p class="text-h6 mb-1">{{ search_location }}</p>
        <v-divider />
        <div
          class="hz-align pl-3 pr-3 pt-4"
          style="justify-content: space-between"
        >
          <div><p class="text-overline">Spaces Available:</p></div>
          <div>
            <p class="text-overline font-weight-bold">
              {{
                location_list[
                  location_list.findIndex(
                    (item) => item.name === search_location
                  )
                ].spot_avail
              }}
              slots
            </p>
          </div>
        </div>
        <div class="hz-align pl-3 pr-3" style="justify-content: space-between">
          <div><p class="text-overline">Ratings:</p></div>
          <div>
            <v-rating
              length="5"
              readonly
              size="15"
              :value="
                location_list[
                  location_list.findIndex(
                    (item) => item.name === search_location
                  )
                ].rating
              "
            ></v-rating>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="location_list_names.includes(search_location) ? true : false"
      class="middle-div"
      id="book-btn-div"
    >
      <v-btn
        :disabled="
          search_location === null || search_location.trim() === ''
            ? true
            : false
        "
        @click="lockLocation"
        id="book-btn"
        large
        dark
        color="deep-purple accent-3"
      >
        Continue
      </v-btn>
    </div>

    <div
      v-if="location_list_names.includes(search_location) ? false : true"
      class="middle-div"
    >
      <div>
        <p class="text-h6">Welcome to CarPark App</p>
        <p class="">
          Simply input your destination and get a list of parking spaces
          available
        </p>
        <img src="../assets/car.svg" alt="" />
      </div>
    </div>
    <div id="container-bottom">
      <v-list class="pl-0 hz-align">
        <v-list-item v-for="item in menu_icon" :key="item.name" link>
          <v-list-item-content style="padding-bottom: 1px">
            <v-list-item-title class="v-list-item-title">
              <div class="pb-4" @click="openMenu(item.name)">
                <v-icon class="pl-4" color="deep-purple accent-3">
                  {{
                    item.name === "history" && !showHistory
                      ? item.icon
                      : item.icon.split("-")[0] + "-" + item.icon.split("-")[1]
                  }}

                  {{
                    item.name === "favorite" && !showFavorite
                      ? item.icon
                      : item.icon.split("-")[0] + "-" + item.icon.split("-")[1]
                  }}

                  {{
                    item.name === "profile" && !showProfile
                      ? item.icon
                      : item.icon.split("-")[0] + "-" + item.icon.split("-")[1]
                  }}

                  {{
                    item.name === "settings" && !showSettings
                      ? item.icon
                      : item.icon.split("-")[0] + "-" + item.icon.split("-")[1]
                  }}
                </v-icon>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <div v-if="showMenu" id="menu-div">
      <!--Fav list start-->

      <div v-if="showFavorite" id="fav-parking-div">
        <div class="fav-list-item list-head">
          <p class="text-h5 pt-3 pl-6">
            Favorite Spots
            <v-btn
              @click="closeMenu"
              text
              fab
              x-small
              outlined
              class="float-right mr-4"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>

        <v-list class="pl-2 pr-2 mt-15" style="background: transparent">
          <v-list-item
            class="mb-4 pl-2 pr-2"
            v-for="item in favorite_list"
            :key="item.name"
          >
            <v-list-item-content
              @click="openFavLocation(item.name)"
              class="fav-list-item"
            >
              <div
                class="hz-align pl-3 pr-3 pt-4"
                style="justify-content: space-between"
              >
                <div>
                  <p class="text-h6">{{ item.name }}</p>
                </div>
                <div @click="removeFromFav(item.name)">
                  <v-icon class="mt-1" color="orange">mdi-star</v-icon>
                </div>
              </div>
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div><p class="font-weight-bold mt-2">Ratings:</p></div>
                <div>
                  <v-rating
                    length="5"
                    readonly
                    size="20"
                    :value="item.rating"
                  ></v-rating>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <!--Fav list end-->

      <!--History start-->

      <div v-if="showHistory" id="fav-parking-div">
        <div class="fav-list-item list-head">
          <p class="text-h5 pt-3 pl-6">
            History
            <v-btn
              @click="closeMenu"
              text
              fab
              x-small
              outlined
              class="float-right mr-4"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>
        <v-list class="pl-2 pr-2 mt-15" style="background: transparent">
          <div class="hz-align" style="justify-content: space-between">
            <p class="font-weight-bold pl-1 mt-4">Upcomimg</p>
            <p class="font-weight-bold pr-1 mt-4">
              <v-icon style="color: #651fff">mdi-clock-time-four</v-icon>
            </p>
          </div>
          <v-list-item
            class="mb-4 pl-2 pr-2"
            v-for="item in upcomimg_list"
            :key="item.payment_id + 'upcoming'"
          >
            <v-list-item-content class="fav-list-item">
              <v-rating
                :length="item.rating"
                readonly
                :value="item.rating"
                size="15"
                color="yellow accent-4"
                class="mt-n2"
              ></v-rating>

              <div
                class="hz-align pl-3 pr-3 mt-n2"
                style="justify-content: space-between"
              >
                <div>
                  <p class="text-h6">{{ item.location }}</p>
                  <p class="mt-n4">
                    {{ item.no_of_slots }}
                    {{ item.no_of_slots > 1 ? "spots" : "spot" }}
                  </p>
                </div>
                <div>
                  <v-btn
                    @click="openBookingDetails(item.payment_id)"
                    text
                    fab
                    elevation="3"
                    small
                    outlined
                  >
                    <v-icon color="">mdi-qrcode</v-icon>
                  </v-btn>
                </div>
              </div>
              <hr />
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">{{ item.check_in_date }}</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">{{ item.check_in_time }}</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">₹ {{ item.payment_amount }}</p>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>

          <div class="hz-align" style="justify-content: space-between">
            <p class="font-weight-bold pl-1 mt-4">Completed</p>
            <p class="font-weight-bold pr-1 mt-4" style="color: #651fff">
              View all
            </p>
          </div>
          <v-list-item
            class="mb-4 pl-2 pr-2"
            v-for="item in history_list"
            :key="item.payment_id + 'history'"
          >
            <v-list-item-content class="fav-list-item">
              <v-rating
                :length="item.rating"
                readonly
                :value="item.rating"
                size="15"
                color="yellow accent-4"
                class="mt-n2"
              ></v-rating>

              <div
                class="hz-align pl-3 pr-3 pt-0 mt-n2"
                style="justify-content: space-between"
              >
                <div>
                  <p class="text-h6">{{ item.location }}</p>
                  <p class="mt-n4">
                    {{ item.no_of_slots }}
                    {{ item.no_of_slots > 1 ? "spots" : "spot" }}
                  </p>
                </div>
                <div>
                  <v-icon class="mt-1" color="green">mdi-check-circle</v-icon>
                </div>
              </div>
              <hr />
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">{{ item.check_in_date }}</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">{{ item.check_in_time }}</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">₹ {{ item.payment_amount }}</p>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <!--History end-->

      <!--Profile start-->
      <div v-if="showProfile">
        <div class="fav-list-item list-head">
          <p class="text-h5 pt-3 pl-6">
            Profile
            <v-btn
              @click="closeMenu"
              text
              fab
              x-small
              outlined
              class="float-right mr-4"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>
        <div class="mt-15 pt-10" id="user-img">
          <v-avatar style="zoom: 1.6">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div class="mt-10" id="text-div">
          <v-text-field
            label="Your Name"
            append-icon="mdi-account-outline"
            color="deep-purple accent-3"
            type="text"
            v-model="name"
            :counter="20"
            outlined
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            append-icon="mdi-cellphone-basic"
            color="deep-purple accent-3"
            type="number"
            v-model="phone"
            outlined
            :counter="10"
            @keyup="validatePhone"
          ></v-text-field>
          <v-text-field
            label="Email"
            append-icon="mdi-email-outline"
            color="deep-purple accent-3"
            type="email"
            v-model="email"
            :counter="35"
            outlined
          ></v-text-field>
          <v-text-field
            label="Password"
            append-icon="mdi-lock-outline"
            color="deep-purple accent-3"
            type="text"
            outlined
            v-model="password"
            :counter="20"
          ></v-text-field>
        </div>
        <div id="save-btn-div">
          <v-btn
            :disabled="btnDisabled()"
            class="mb-8 mt-4"
            large
            :dark="!btnDisabled()"
            color="deep-purple accent-3"
          >
            SAVE
          </v-btn>
        </div>
      </div>
      <!--Profile ends-->
      <!--Settings start-->
      <div v-if="showSettings">
        <div class="fav-list-item list-head">
          <p class="text-h5 pt-3 pl-6">
            Settings
            <v-btn
              @click="closeMenu"
              text
              fab
              x-small
              outlined
              class="float-right mr-4"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>

        <div class="mt-15 pt-5">
          <template>
            <v-card class="mx-auto" max-width="344">
              <v-card-title> Terms And Conditions </v-card-title>

              <v-card-subtitle>
                Last update on : 20th Nov 2021
              </v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mt-n3" icon @click="showPrivacy = !showPrivacy">
                  <v-icon>{{
                    showPrivacy ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="showPrivacy">
                  <v-divider></v-divider>

                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </template>

          <template>
            <v-card class="mx-auto mt-5" max-width="344">
              <v-card-title> Privacy Policy </v-card-title>

              <v-card-subtitle>
                Last update on : 20th Nov 2021
              </v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mt-n3" icon @click="showTandC = !showTandC">
                  <v-icon>{{
                    showTandC ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="showTandC">
                  <v-divider></v-divider>

                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </template>
        </div>
        <div id="logout-btn-div">
          <v-btn
            @click="goToLogin"
            class="mb-3"
            large
            dark
            color="deep-purple accent-3"
          >
            LOGOUT
          </v-btn>
        </div>
      </div>
      <!--Settings end-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location_list: [],
      favorite_list: [],
      history_list: [],
      upcomimg_list: [],
      location_list_names: [],
      name: "",
      phone: "",
      email: "",
      password: "",
      menu_icon: [
        {
          name: "favorite",
          icon: "mdi-star-outline",
        },
        {
          name: "history",
          icon: "mdi-ticket-percent-outline",
        },
        {
          name: "profile",
          icon: "mdi-account-outline",
        },
        {
          name: "settings",
          icon: "mdi-cog-outline",
        },
      ],
      search_location: "",
      showTandC: false,
      showPrivacy: false,
      showFavorite: false,
      showHistory: false,
      showProfile: false,
      showSettings: false,
      showMenu: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    openBookingDetails(id) {
      const findIndex = this.upcomimg_list.findIndex(
        (item) => item.payment_id === id
      );
      this.$store.commit("setBookingsDetails", this.upcomimg_list[findIndex]);
      this.$router.push("/booking-details");
    },
    openFavLocation(name) {
      const index = this.favorite_list.findIndex((item) => item.name === name);
      if (index >= 0) {
        this.search_location = this.favorite_list[index].name;
        this.closeMenu();
      }
    },

    validatePhone() {
      if (this.phone.length > 10) {
        this.phone = this.phone.substring(0, 10);
      }
      if (!/^[6-9]/.test(this.phone.substring(0, 1))) {
        this.phone = "";
      }
    },
    btnDisabled() {
      if (
        this.name.length < 3 ||
        this.phone.length < 10 ||
        this.email.length < 5 ||
        !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email) ||
        this.password.length < 6
      )
        return true;

      return false;
    },
    openMenu(item) {
      this.showMenu = true;
      if (item === "favorite") {
        this.showFavorite = true;
        this.showHistory = false;
        this.showProfile = false;
        this.showSettings = false;
      } else if (item === "history") {
        this.showHistory = true;
        this.showFavorite = false;
        this.showProfile = false;
        this.showSettings = false;
      } else if (item === "profile") {
        this.showProfile = true;
        this.showFavorite = false;
        this.showHistory = false;
        this.showSettings = false;
      } else if (item === "settings") {
        this.showSettings = true;
        this.showFavorite = false;
        this.showHistory = false;
        this.showProfile = false;
      }
    },
    closeMenu() {
      this.showMenu = false;
      this.showSettings = false;
      this.showFavorite = false;
      this.showHistory = false;
      this.showProfile = false;
    },
    removeFromFav(name) {
      const index = this.favorite_list.findIndex((item) => item.name === name);
      this.favorite_list.splice(index, 1);
      this.$store.commit("setFavList", this.favorite_list);
    },
    lockLocation() {
      const lockedLocation =
        this.location_list[
          this.location_list.findIndex(
            (item) => item.name === this.search_location
          )
        ];
      this.$store.commit("lockLocation", lockedLocation);

      this.$router.push("/booking");
    },
  },
  mounted() {
    this.location_list = this.$store.state.location_list;
    this.favorite_list = this.$store.state.favorite_list;
    this.history_list = this.$store.state.history_list;
    this.upcomimg_list = this.$store.state.upcomimg_list;
    const user = this.$store.state.user;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.password = user.password;
    this.location_list.forEach((location) => {
      this.location_list_names.push(location.name);
    });
  },
  created() {
    this.$store.commit("lockLocation", null);
    this.$store.commit("setBookingsDetails", null);
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#menu-div {
  position: absolute;
  height: 90.7vh;
  width: 100%;
  z-index: 99;
  background: rgb(236, 236, 236);
  overflow-y: auto;
}
#logout-btn-div > button {
  width: 100%;
}
#logout-btn-div {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 99;
  padding-left: 10px;
  padding-right: 10px;
}
#save-btn-div {
  width: 100%;
  display: block;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
}
#save-btn-div > button {
  width: 100%;
}
#user-img {
  text-align: center;
  display: block;
  width: 100%;
}
#text-div {
  margin-top: 0px;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#fav-parking-div {
  height: 100%;
  width: 100%;
  display: block;
  margin: 0 auto;
  position: relative;
}
.fav-list-item {
  background: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.list-head {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
}
#background-map-div {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
}
#background-map-div > img {
  margin: 0 auto;
  width: 100%;

  display: block;
}
#search-box {
  position: absolute;
  top: 15%;
  z-index: 2;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
#container-bottom {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  display: block;
  z-index: 3;
}
.middle-div {
  position: absolute;
  bottom: 100px;
  margin: 0 auto;
  width: 100%;
  display: block;
  z-index: 3;
  padding-left: 20px;
  padding-right: 20px;
}
.middle-div > div {
  display: block;
  margin: 0 auto;
  background: white;
  border-radius: 7px;
  height: 170px;
  text-align: center;
  padding: 20px;
}
#selected-div {
  bottom: 150px;
}
#book-btn-div {
  bottom: 95px;
}

#book-btn {
  width: 100%;
}

.hz-align {
  display: flex;
  flex-direction: row;
}
</style>
