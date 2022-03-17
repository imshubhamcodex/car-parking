<template>
  <div>
    <div id="container">
      <img src="../assets/logo.svg" />
      <br />
      <p class="mt-7">
        {{
          currentSlide === 0 ? "Enter your phone number" : "Enter your password"
        }}
      </p>
    </div>

    <template>
      <v-carousel
        height="250"
        :show-arrows="false"
        hide-delimiter-background
        
        id="container-slides"
      >
        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div id="text-div">
              <v-text-field
                  label="Your Name"
                  append-icon="mdi-account-outline"
                  color="deep-purple accent-3"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Phone Number"
                  append-icon="mdi-cellphone-basic"
                  color="deep-purple accent-3"
                  type="number"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  append-icon="mdi-email-outline"
                  color="deep-purple accent-3"
                  type="email"
                ></v-text-field>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div id="text-div">
                <v-text-field
                  label="Password"
                  append-icon="mdi-lock-outline"
                  color="deep-purple accent-3"
                  type="password"
                ></v-text-field>
                <v-text-field
                  class="mt-3"
                  label="Confirm Password"
                  append-icon="mdi-lock-outline"
                  color="deep-purple accent-3"
                  type="password"
                ></v-text-field>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center"> </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </template>

    <div id="container-bottom">
      <v-btn
        @click="nextSlide"
        class="btns mb-7"
        large
        dark
        color="deep-purple accent-3"
      >
        {{
          currentSlide === 0 ? "NEXT" : "CREATE ACCOUNT"
        }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < 1) {
        this.currentSlide++;
        document.getElementsByTagName("button")[this.currentSlide].click();
      }
    },
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
.btns {
  width: 95%;
}
#text-div {
  margin-top: -40px;
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#container {
  height: 120px;
  width: 100%;
  display: block;
  margin: 90px auto;
  text-align: center;
}
#container-bottom {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  display: block;
  text-align: center;
  padding-bottom: 50px;
}
</style>
