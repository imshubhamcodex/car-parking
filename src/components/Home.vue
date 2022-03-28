<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/home-map.svg" />
    </div>
    <div id="search-box" class="g-animi1">
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
      <v-btn
        fab
        x-small
        outlined
        text
        class="mt-1 mr-1"
        @click="toggleInFavList"
        style="float: right"
      >
        <v-icon :color="changeColor() ? 'yellow' : 'grey'"> mdi-star</v-icon>
      </v-btn>
      <div>
        <p class="text-h6 mb-1">{{ search_location }}</p>
        <v-divider />
        <div
          class="hz-align pl-3 pr-3 pt-3"
          style="justify-content: space-between"
        >
          <div><p class="text-overline mb-0">Space Available:</p></div>
          <div>
            <p class="text-overline font-weight-bold mb-0">
              {{
                location_list[
                  location_list.findIndex(
                    (item) => item.name === search_location
                  )
                ].spot_avail
              }}
              {{
                location_list[
                  location_list.findIndex(
                    (item) => item.name === search_location
                  )
                ].spot_avail > 1
                  ? "Slots"
                  : "Slot"
              }}
            </p>
          </div>
        </div>
        <div class="hz-align pl-3 pr-3" style="justify-content: space-between">
          <div><p class="text-overline mb-0">Fee per Hour:</p></div>
          <div>
            <p class="text-overline font-weight-bold mb-0">
              ₹
              {{
                location_list[
                  location_list.findIndex(
                    (item) => item.name === search_location
                  )
                ].fee_per_hour
              }}
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
      <v-list class="pl-0 pt-0 pb-0 hz-align">
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
              elevation="2"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>

        <v-list class="pl-2 pr-2 mt-15" style="background: transparent">
          <v-list-item
            class="mb-4 pl-1 pr-2"
            v-for="item in favorite_list"
            :key="item.location_id + 'fav'"
          >
            <v-btn
              fab
              x-small
              outlined
              text
              class="mt-1 mr-1 menu-item-animi"
              @click="removeFromFav(item.name)"
              style="position: absolute; top: 5px; right: 10px; z-index: 99"
            >
              <v-icon color="orange"> mdi-star</v-icon>
            </v-btn>
            <v-list-item-content
              @click="openLocation(item.location_id)"
              class="fav-list-item menu-item-animi"
            >
              <div>
                <p class="text-h6 mb-1 ml-2">{{ item.name }}</p>
                <v-divider />
                <div
                  class="hz-align pl-3 pr-3 pt-3"
                  style="justify-content: space-between"
                >
                  <div><p class="text-overline mb-0">Space Available:</p></div>
                  <div>
                    <p class="text-overline font-weight-bold mb-0">
                      {{
                        location_list[
                          location_list.findIndex(
                            (obj) => obj.name === item.name
                          )
                        ].spot_avail
                      }}
                      slots
                    </p>
                  </div>
                </div>
                <div
                  class="hz-align pl-3 pr-3"
                  style="justify-content: space-between"
                >
                  <div><p class="text-overline mb-0">Fee per Hour:</p></div>
                  <div>
                    <p class="text-overline font-weight-bold mb-0">
                      ₹
                      {{
                        location_list[
                          location_list.findIndex(
                            (obj) => obj.name === item.name
                          )
                        ].fee_per_hour
                      }}
                    </p>
                  </div>
                </div>
                <div
                  class="hz-align pl-3 pr-3"
                  style="justify-content: space-between"
                >
                  <div><p class="text-overline">Ratings:</p></div>
                  <div>
                    <v-rating
                      length="5"
                      readonly
                      size="15"
                      :value="
                        location_list[
                          location_list.findIndex(
                            (obj) => obj.name === item.name
                          )
                        ].rating
                      "
                    ></v-rating>
                  </div>
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
              elevation="2"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>
        <v-list class="pl-2 pr-2 mt-15" style="background: transparent">
          <div class="hz-align" style="justify-content: space-between">
            <p class="font-weight-bold pl-1 mt-4">Upcomimg</p>
            <p class="font-weight-bold pr-1 mt-4">
              <v-icon style="color: #651fff">mdi-clock-outline</v-icon>
            </p>
          </div>
          <v-list-item
            class="mb-4 pl-2 pr-2"
            v-for="item in upcomimg_list"
            :key="item.payment_id + 'upcoming'"
          >
            <v-list-item-content class="fav-list-item menu-item-animi pb-0">
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
                  <p class="mt-2 mb-0">Enter After:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{ reshapeTime(item.check_in_date, item.check_in_time) }}
                  </p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{ reshapeDate(item.check_in_date, item.check_in_time) }}
                  </p>
                </div>
              </div>
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">Exit Before:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{
                      exitTime(
                        item.check_in_date,
                        item.check_in_time,
                        item.no_of_hours
                      )
                    }}
                  </p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{
                      exitDate(
                        item.check_in_date,
                        item.check_in_time,
                        item.no_of_hours
                      )
                    }}
                  </p>
                </div>
              </div>
              <hr class="mt-2" />
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">Total Duration:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{ item.no_of_hours }}
                    {{ item.no_of_hours > 1 ? " (Hrs.)" : " (Hr.)" }}
                  </p>
                </div>
              </div>
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">Amount Paid:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">₹ {{ item.payment_amount }}</p>
                </div>
              </div>
              <hr class="mt-2" />
              <div class="mr-2 mt-0">
                <v-btn
                  @click="cancleUpcoming(item.location_id)"
                  :dark="
                    !(
                      new Date(
                        item.check_in_date +
                          'T' +
                          item.check_in_time +
                          ':00.000+05:30'
                      ).valueOf() <
                      new Date().valueOf() + 1000 * 60 * 60 * 1
                    )
                  "
                  color="red"
                  small
                  style="width: 100%"
                  :disabled="
                    new Date(
                      item.check_in_date +
                        'T' +
                        item.check_in_time +
                        ':00.000+05:30'
                    ).valueOf() <
                    new Date().valueOf() + 1000 * 60 * 60 * 1
                  "
                >
                  cancle
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>

          <div class="hz-align" style="justify-content: space-between">
            <p class="font-weight-bold pl-1 mt-4">In-Progress</p>
            <p class="font-weight-bold pr-1 mt-4" style="color: #651fff">
              <v-icon style="color: #651fff">mdi-progress-check</v-icon>
            </p>
          </div>
          <v-list-item
            class="mb-4 pl-2 pr-2"
            v-for="item in inprogress_list"
            :key="item.payment_id + 'inprogress'"
          >
            <v-list-item-content class="fav-list-item menu-item-animi pb-0">
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
                  <v-btn
                    @click="openBookingDetailsInProgress(item.payment_id)"
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
                  <p class="mt-2 mb-0">Exit Before:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{
                      exitTime(
                        item.check_in_date,
                        item.check_in_time,
                        item.no_of_hours + sumOfExtendedHours(item)
                      )
                    }}
                  </p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{
                      exitDate(
                        item.check_in_date,
                        item.check_in_time,
                        item.no_of_hours + sumOfExtendedHours(item)
                      )
                    }}
                  </p>
                </div>
              </div>
              <hr class="mt-2" />
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">Total Duration:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    {{ item.no_of_hours + sumOfExtendedHours(item) }}
                    {{
                      item.no_of_hours + sumOfExtendedHours(item) > 1
                        ? " (Hrs.)"
                        : " (Hr.)"
                    }}
                  </p>
                </div>
              </div>
              <div
                class="hz-align pl-3 pr-5"
                style="justify-content: space-between"
              >
                <div>
                  <p class="mt-2 mb-0">Amount Paid:</p>
                </div>
                <div>
                  <p class="mt-2 mb-0">
                    ₹
                    {{
                      item.payment_amount + sumOfAmountForExtendedHours(item)
                    }}
                  </p>
                </div>
              </div>
              <hr class="mt-2" />
              <div v-if="!showExtendHourDiv" class="mr-2 mt-0">
                <v-btn
                  @click="showExtendHourDiv = !showExtendHourDiv"
                  dark
                  color="green"
                  small
                  style="width: 100%"
                  :disabled="item.no_of_hours + sumOfExtendedHours(item) >= 350"
                >
                  extend
                </v-btn>
              </div>
              <div class="mr-2 mt-4" v-else>
                <div
                  class="hz-align pl-3 pr-3"
                  style="justify-content: space-between"
                >
                  <div>
                    <p class="font-weight-bold">Extend hours :</p>
                  </div>
                  <div>
                    <p class="font-weight-bold">{{ extend_hours }} Hrs.</p>
                  </div>
                </div>
                <span v-for="(chip, i) in chips" :key="chip.value + 'chip'">
                  <v-chip
                    @click="extendHours(chip.value, i)"
                    small
                    class="ma-2"
                    color="success"
                    :outlined="!chip.selected"
                  >
                    <v-icon style="zoom: 0.7" left> mdi-clock-plus </v-icon>
                    {{ chip.value }} Hr
                  </v-chip>
                </span>

                <div class="mr-0 mt-3">
                  <v-btn
                    @click="bookExtendHours(item.location_id)"
                    dark
                    color="green"
                    small
                    style="width: 100%"
                  >
                    book
                  </v-btn>
                </div>
                <div class="mr-0 mt-3">
                  <v-btn
                    @click="showExtendHourDiv = !showExtendHourDiv"
                    dark
                    color="red"
                    small
                    style="width: 100%"
                  >
                    close
                  </v-btn>
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
            @click="openLocation(item.location_id)"
          >
            <v-list-item-content class="fav-list-item menu-item-animi">
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
              elevation="2"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>
        <div class="mt-15 pt-10 menu-item-animi" id="user-img"></div>
        <div class="mt-10" id="text-div">
          <v-text-field
            label="Your Name"
            append-icon="mdi-account-outline"
            color="deep-purple accent-3"
            type="text"
            v-model="name"
            :counter="20"
            outlined
            class="menu-item-animi"
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
            class="menu-item-animi"
          ></v-text-field>
          <v-text-field
            label="Email"
            append-icon="mdi-email-outline"
            color="deep-purple accent-3"
            type="email"
            v-model="email"
            :counter="35"
            outlined
            class="menu-item-animi"
          ></v-text-field>
          <v-text-field
            label="Password"
            append-icon="mdi-lock-outline"
            color="deep-purple accent-3"
            type="text"
            outlined
            v-model="password"
            :counter="20"
            class="menu-item-animi"
          ></v-text-field>
        </div>
        <div id="save-btn-div">
          <v-btn
            :disabled="btnDisabled()"
            class="mb-8 mt-4 menu-item-animi"
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
              elevation="2"
            >
              <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </p>
        </div>

        <div class="mt-15 pt-5">
          <template>
            <v-card class="mx-auto menu-item-animi" max-width="344">
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
            <v-card class="mx-auto mt-5 menu-item-animi" max-width="344">
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
        <div id="logout-btn-div" class="menu-item-animi">
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
import gsap from "gsap";
import firebase from "firebase";
export default {
  data() {
    return {
      location_list: [],
      favorite_list: [],
      history_list: [],
      upcomimg_list: [],
      inprogress_list: [],
      location_list_names: [],
      extend_hours: 0,
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
      chips: [
        {
          value: 1,
          selected: false,
        },
        {
          value: 2,
          selected: false,
        },
        {
          value: 3,
          selected: false,
        },
        {
          value: 4,
          selected: false,
        },
        {
          value: 5,
          selected: false,
        },
        {
          value: 10,
          selected: false,
        },
        {
          value: 15,
          selected: false,
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
      showExtendHourDiv: false,
      openItem: "",
    };
  },
  methods: {
    openBookingDetailsInProgress(id) {
      const findIndex = this.inprogress_list.findIndex(
        (item) => item.payment_id === id
      );
      this.$store.commit("setBookingsDetails", this.inprogress_list[findIndex]);
      this.$router.push("/booking-details");
    },
    sumOfAmountForExtendedHours(item) {
      let sum = 0;
      for (let i = 0; i < item.extended_hours_payment_amount.length; i++) {
        sum += item.extended_hours_payment_amount[i];
      }
      return sum;
    },
    sumOfExtendedHours(item) {
      let sum = 0;
      for (let i = 0; i < item.extended_hours.length; i++) {
        sum += item.extended_hours[i];
      }
      return sum;
    },
    reshapeDate(date, time) {
      const dateLocale = new Date(date + "T" + time + ":00.000+05:30")
        .toLocaleDateString()
        .split("/");
      if (dateLocale[0].length == 1) {
        dateLocale[0] = "0" + dateLocale[0];
      }
      if (dateLocale[1].length == 1) {
        dateLocale[1] = "0" + dateLocale[1];
      }

      return dateLocale[1] + "-" + dateLocale[0] + "-" + dateLocale[2];
    },
    reshapeTime(date, time) {
      let newTime = new Date(new Date(date + "T" + time + ":00.000+05:30"))
        .toLocaleTimeString()
        .split(":");
      if (newTime[0].length == 1) {
        newTime[0] = "0" + newTime[0];
      }
      if (newTime[1].length == 1) {
        newTime[1] = "0" + newTime[1];
      }
      return (
        newTime[0] +
        ":" +
        newTime[1] +
        " " +
        new Date(new Date(date + "T" + time + ":00.000+05:30"))
          .toLocaleTimeString()
          .split(" ")[1]
      );
    },
    exitDate(date, time, no_of_hours) {
      const dateLocale = new Date(
        new Date(date + "T" + time + ":00.000+05:30").valueOf() +
          no_of_hours * 60 * 60 * 1000
      )
        .toLocaleDateString()
        .split("/");
      if (dateLocale[0].length == 1) {
        dateLocale[0] = "0" + dateLocale[0];
      }
      if (dateLocale[1].length == 1) {
        dateLocale[1] = "0" + dateLocale[1];
      }

      return dateLocale[1] + "-" + dateLocale[0] + "-" + dateLocale[2];
    },
    exitTime(date, time, no_of_hours) {
      const timeLocale = new Date(
        new Date(date + "T" + time + ":00.000+05:30").valueOf() +
          no_of_hours * 60 * 60 * 1000
      )
        .toLocaleTimeString()
        .split(":");
      if (timeLocale[0].length == 1) {
        timeLocale[0] = "0" + timeLocale[0];
      }
      if (timeLocale[1].length == 1) {
        timeLocale[1] = "0" + timeLocale[1];
      }

      return (
        timeLocale[0] +
        ":" +
        timeLocale[1] +
        " " +
        new Date(
          new Date(date + "T" + time + ":00.000+05:30").valueOf() +
            no_of_hours * 60 * 60 * 1000
        )
          .toLocaleTimeString()
          .split(" ")[1]
      );
    },

    bookExtendHours(location_id) {
      const fee =
        this.location_list[
          this.location_list.findIndex(
            (item) => item.location_id === location_id
          )
        ].fee_per_hour;

      const inprogress =
        this.inprogress_list[
          this.inprogress_list.findIndex(
            (item) => item.location_id === location_id
          )
        ];
      inprogress.extended_hours.push(this.extend_hours);
      inprogress.extended_hours_payment_amount.push(fee * this.extend_hours),
        this.$store.commit("setBookingsDetails", {
          no_of_slots: inprogress.no_of_slots,
          no_of_hours: inprogress.no_of_hours,
          check_in_time: inprogress.check_in_time,
          check_in_date: inprogress.check_in_date,
          location: inprogress.location,
          location_id: inprogress.location_id,
          rating: inprogress.rating,
          payment_id: inprogress.payment_id,
          payment_amount: inprogress.payment_amount,
          extended_hours: inprogress.extended_hours,
          extended_hours_payment_id: inprogress.extended_hours_payment_id,
          extended_hours_payment_amount:
            inprogress.extended_hours_payment_amount,
        });

      // console.log(inprogress.payment_id);

      this.$router.push("/payment");
    },
    extendHours(value, index) {
      if (this.chips[index].selected) {
        this.chips[index].selected = false;
        this.extend_hours = this.extend_hours - value;
      } else {
        this.extend_hours += value;
        this.chips[index].selected = true;
      }
    },
    cancleUpcoming(location_id) {
      this.upcomimg_list.forEach((item, index) => {
        if (item.location_id == location_id) {
          this.upcomimg_list.splice(index, 1);
        }
      });

      firebase
        .firestore()
        .collection("upcoming_list")
        .doc(this.$store.state.user.user_id)
        .update({
          list: this.upcomimg_list,
        });

      //initiate refund
    },
    async goToLogin() {
      this.$store.commit("setUser", null);
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.code, error.message);
          alert("Error while logging out");
        });
    },
    changeColor() {
      for (let i = 0; i < this.favorite_list.length; i++) {
        if (this.favorite_list[i].name == this.search_location) {
          return true;
        }
      }

      return false;
    },

    toggleInFavList() {
      const index = this.favorite_list.findIndex(
        (item) => item.name === this.search_location
      );
      if (index > -1) {
        this.removeFromFav(this.search_location);
      } else {
        this.favorite_list.unshift(
          this.location_list[
            this.location_list.findIndex(
              (item) => item.name === this.search_location
            )
          ]
        );

        this.$store.commit("setFavList", this.favorite_list);
        this.updateFavListInDB();
      }
    },
    openBookingDetails(id) {
      const findIndex = this.upcomimg_list.findIndex(
        (item) => item.payment_id === id
      );
      this.$store.commit("setBookingsDetails", this.upcomimg_list[findIndex]);
      this.$router.push("/booking-details");
    },
    openLocation(location_id) {
      const index = this.location_list.findIndex(
        (item) => item.location_id === location_id
      );
      if (index >= 0) {
        this.search_location = this.location_list[index].name;
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
      this.openItem = item;

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
      gsap.fromTo(
        "#menu-div",
        {
          duration: 1,
          y: "0",
          ease: "power3.out",
          opacity: 1,
        },
        {
          duration: 1,
          y: "100%",
          opacity: 0,
          ease: "power3.out",
        }
      );
      setTimeout(() => {
        this.showMenu = false;
        this.showMenu = false;
        this.showSettings = false;
        this.showFavorite = false;
        this.showHistory = false;
        this.showProfile = false;
      }, 500);
    },
    removeFromFav(name) {
      const index = this.favorite_list.findIndex((item) => item.name === name);
      this.favorite_list.splice(index, 1);
      this.$store.commit("setFavList", this.favorite_list);
      this.updateFavListInDB();
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
    // DB operations
    async updateFavListInDB() {
      let location_id_list = [];
      this.favorite_list.forEach((item) => {
        location_id_list.push(item.location_id);
      });

      await firebase
        .firestore()
        .collection("favorite_list")
        .doc(this.$store.state.user.user_id)
        .set(
          {
            list: location_id_list,
          },
          { merge: true }
        );
    },
  },
  async mounted() {
    if (this.$store.state.user === null) {
      this.$router.push("/login");
      return;
    }

    gsap.from("#search-box", {
      duration: 1,
      y: "-60",
      ease: "power3.out",
    });

    gsap.from(".middle-div", {
      duration: 0.6,
      y: "40",
      ease: "power3.out",
    });

    // DB ops START

    firebase
      .firestore()
      .collection("upcoming_list")
      .doc(this.$store.state.user.user_id)
      .get()
      .then((res) => {
        if (res.exists) {
          const data = res.data().list.sort(function (a, b) {
            return new Date(b.check_in_date) - new Date(a.check_in_date);
          });
          this.$store.commit("setUpcomingListFromDB", data);
        }
      })
      .catch((error) => {
        alert("Error while fetching upcoming list: " + error.message);
      });

    await firebase
      .firestore()
      .collection("favorite_list")
      .doc(this.$store.state.user.user_id)
      .get()
      .then((res) => {
        if (res.exists) {
          let fav_list = [];
          res.data().list.forEach((item) => {
            firebase
              .firestore()
              .collection("location_list")
              .doc(item)
              .get()
              .then((res) => {
                fav_list.push(res.data()[item]);
              });
          });
          this.$store.commit("setFavList", fav_list);
        }
      })
      .catch((error) => {
        alert("Error while fetching favorite list: " + error.message);
      });

    await firebase
      .firestore()
      .collection("inprogress_list")
      .doc(this.$store.state.user.user_id)
      .get()
      .then((res) => {
        if (res.exists) {
          this.$store.commit("setInProgressListFromDB", res.data().list);
        }
      })
      .catch((error) => {
        alert("Error while fetching progress list: " + error.message);
      });

    // DB ops ENDS

    window.addEventListener("keyup", () => {
      if (
        this.search_location.trim() !== "" &&
        this.search_location !== undefined
      )
        this.lockLocation();
    });

    this.$store.commit("setBookingsDetails", {});

    this.location_list = this.$store.state.location_list;
    this.favorite_list = this.$store.state.favorite_list;
    this.history_list = this.$store.state.history_list;
    this.upcomimg_list = this.$store.state.upcomimg_list;
    this.inprogress_list = this.$store.state.inprogress_list;
    const user = this.$store.state.user;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.password = user.password;
    this.location_list.forEach((location) => {
      this.location_list_names.push(location.name);
    });

    // const location_list = [
    //   {
    //     name: "Lekki Gardens Car Park",
    //     rating: 2,
    //     spot_avail: 20,
    //     fee_per_hour: 1,
    //     location_id: "loc1",
    //     booking_allowed: true,
    //   },
    //   {
    //     name: "Josh's Ground Car Park",
    //     rating: 5,
    //     spot_avail: 5,
    //     fee_per_hour: 2,
    //     location_id: "loc2",
    //     booking_allowed: true,
    //   },
    //   {
    //     name: "Boss Gardens Car Park",
    //     rating: 4.5,
    //     spot_avail: 2,
    //     fee_per_hour: 3,
    //     location_id: "loc3",
    //     booking_allowed: true,
    //   },
    // ];

    // // testing
    // firebase.firestore().collection("location_list").doc(location_list[2].location_id).set(
    //   {
    //     [location_list[2].location_id]:location_list[2],
    //   },
    //   { merge: true }
    // );

    //testing
  },
  async created() {
    await firebase
      .firestore()
      .collection("location_list")
      .get()
      .then((res) => {
        let location_list = [];
        const list_obj = res.docs.map((doc) => doc.data());
        list_obj.forEach((item) => {
          location_list.push(Object.values(item)[0]);
        });
        this.$store.commit("setLocationList", location_list);
      });
    this.$store.commit("lockLocation", null);
    this.$store.commit("setBookingsDetails", null);
  },
  watch: {
    showMenu: function () {
      if (this.showMenu) {
        setTimeout(() => {
          gsap.fromTo(
            ".menu-item-animi",
            {
              duration: 0.6,
              opacity: 0,
              y: "50",
              ease: "power3.out",
              stagger: 0.2,
            },

            {
              duration: 0.6,
              opacity: 1,
              y: "0",
              ease: "power3.out",
              stagger: 0.2,
            }
          );
        }, 10);
      }
    },
    openItem: function () {
      if (this.showMenu) {
        setTimeout(() => {
          gsap.fromTo(
            ".menu-item-animi",
            {
              duration: 0.6,
              opacity: 0,
              y: "50",
              ease: "power3.out",
              stagger: 0.2,
            },

            {
              duration: 0.6,
              opacity: 1,
              y: "0",
              ease: "power3.out",
              stagger: 0.2,
            }
          );
        }, 10);
      }
    },
  },
};
</script>

<style scoped>
.menu-item-animi {
  opacity: 0;
}
p {
  font-family: "Roboto";
}
#menu-div {
  position: absolute;
  height: 92.8vh;
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
  top: 40px;
  z-index: 2;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
#container-bottom {
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  display: block;
  z-index: 3;
}
.middle-div {
  position: absolute;
  bottom: 150px;
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
  bottom: 190px;
}
#book-btn-div {
  bottom: 130px;
}

#book-btn {
  width: 100%;
}

.hz-align {
  display: flex;
  flex-direction: row;
}

@media (max-height: 650px) {
  #menu-div {
    height: 91.5vh;
  }
}
</style>
