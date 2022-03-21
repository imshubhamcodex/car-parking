<template>
  <div>
    <!--
    <div class="container">
      <img src="../assets/car-girl.svg" />
      <br />
      <br />
      <div id="para-div">
        <p class="mt-10 text-h6">Best Parking Spots</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
    </div>


    <div class="container">
      <img src="../assets/map.svg" />
      <br />
      <br />
      <div id="para-div">
        <p class="mt-10 text-h6">Quick Navigation</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
    </div>



    <div class="container">
      <img src="../assets/man-payment.svg" />
      <br />
      <br />
      <div id="para-div">
        <p class="mt-10 text-h6">Easy Payment</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
    </div>

    -->

    <template>
      <v-carousel
        height="450"
        :show-arrows="false"
        hide-delimiter-background
        id="container-slides"
      >
        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="container">
                <img src="../assets/car-girl.svg" />
                <br />
                <br />
                <div id="para-div">
                  <p class="mt-10 text-h6">Best Parking Spots</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="container">
                <img src="../assets/map.svg" />
                <br />
                <br />
                <div id="para-div">
                  <p class="mt-10 text-h6">Quick Navigation</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="container">
                <img src="../assets/man-payment.svg" />
                <br />
                <br />
                <div id="para-div">
                  <p class="mt-10 text-h6">Easy Payment</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </template>

    <div id="container-bottom" class="pl-2 pr-2">
      <div v-if="currentSlide < 2 ? true : false" id="btn-nav">
        <v-btn
          text
          outlined
          color="deep-purple accent-3"
          @click="prevSlide"
          :disabled="currentSlide <= 0 ? true : false"
        >
          {{ currentSlide === 0 ? "SKIP" : "BACK" }}
        </v-btn>
        <v-btn text outlined color="deep-purple accent-3" @click="nextSlide">
          {{ currentSlide === 2 ? "FINISH" : "NEXT" }}
        </v-btn>
      </div>
      <v-btn @click="goToLogin" v-else id="started" large dark color="deep-purple accent-3">
        GET STARTED
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
      if (this.currentSlide < 2) {
        this.currentSlide++;
        document.getElementsByTagName("button")[this.currentSlide].click();
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        document.getElementsByTagName("button")[this.currentSlide].click();
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#started {
  width: 100%;
}
#btn-nav {
  display: flex;
  justify-content: space-between;
}
#para-div {
  max-width: 250px;
  margin: 0 auto;
  width: 100%;
  display: block;
}
.container {
  text-align: center;
}
#container-slides {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#container-bottom {
  position: absolute;
  bottom: 50px;
  margin: 0 auto;
  width: 100%;
  display: block;
}
</style>
