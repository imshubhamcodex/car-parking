<template>
  <div>
    <div id="background-map-div">
      <img src="../assets/home-map.svg" />
    </div>
    <div id="search-box">
      <v-autocomplete
        v-model="search_location"
        :items="location_list"
        prepend-inner-icon="mdi-map-marker"
        solo
        label=" Where are you going ?"
        color="deep-purple accent-3"
      ></v-autocomplete>
    </div>

    <div
      v-if="location_list.includes(search_location) ? true : false"
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
            <p class="text-overline font-weight-bold">{{ spot_avail }} slots</p>
          </div>
        </div>
        <div class="hz-align pl-3 pr-3" style="justify-content: space-between">
          <div><p class="text-overline">Ratings:</p></div>
          <div>
            <v-rating
              length="5"
              readonly
              size="15"
              :value="spot_rating"
            ></v-rating>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="location_list.includes(search_location) ? true : false"
      class="middle-div"
      id="book-btn-div"
    >
      <v-btn class="" id="book-btn" large dark color="deep-purple accent-3">
        Continue
      </v-btn>
    </div>

    <div
      v-if="location_list.includes(search_location) ? false : true"
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
              <div class="pb-4">
                <v-icon class="pl-4">{{ item.icon }}</v-icon>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location_list: ["Lekki Gardens Car Park", "Josh's Ground Car Park"],
      menu_icon: [
        {
          name: "Profile",
          icon: "mdi-account-cog-outline",
        },
        {
          name: "Bookings",
          icon: "mdi-ticket-percent-outline",
        },
        {
          name: "Wallet",
          icon: "mdi-wallet-outline",
        },

        {
          name: "Settings",
          icon: "mdi-cog-outline",
        },
      ],
      search_location: "",
      spot_avail: 10,
      spot_rating: 4,
    };
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
