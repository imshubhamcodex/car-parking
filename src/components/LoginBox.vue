<template>
  <div>
    <div id="container">
      <img class="g-animi" src="../assets/logo.svg" />
      <div id="text-div">
        <v-text-field
          label="Phone Number"
          append-icon="mdi-cellphone-basic"
          color="deep-purple accent-3"
          type="number"
          :counter="10"
          @keyup="phoneNumberChange"
          v-model="phone"
          class="g-animi"
        ></v-text-field>
        <v-text-field
          class="mt-3 g-animi"
          label="Password"
          append-icon="mdi-lock-outline"
          color="deep-purple accent-3"
          type="password"
          v-model="password"
          :counter="20"
        ></v-text-field>

        <p class="g-animi">Forgot Password ?</p>
      </div>
    </div>

    <div id="container-bottom">
      <v-btn
        :disabled="
          this.phone.trim() === '' ||
          this.password.trim() === '' ||
          this.phone.length < 10 ||
          this.password.length < 6
            ? true
            : false
        "
        class="btns mb-9 g-animi-btn"
        large
        :dark="
          this.phone.trim() === '' ||
          this.password.trim() === '' ||
          this.phone.length < 10 ||
          this.password.length < 6
            ? false
            : true
        "
        color="deep-purple accent-3"
        @click="goForAuth"
      >
        LOGIN
      </v-btn>
      <v-btn
        outlined
        text
        class="btns mb-15 g-animi-btn"
        large
        color="deep-purple accent-3"
        @click="goToSignup"
      >
        SIGN UP
      </v-btn>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    goToSignup() {
      this.$router.push("/signup");
    },
    goForAuth() {
      //if authenticated sucessfully
      this.$router.push("/home");
    },
    phoneNumberChange() {
      //  /^[789]\d{9}$/
      if (this.phone.length > 10) {
        this.phone = this.phone.substring(0, 10);
      }
      if (!/^[6-9]/.test(this.phone.substring(0, 1))) {
        this.phone = "";
      }
    },
  },
  mounted() {
    document.documentElement.style.setProperty("overflow", "auto");
    const metaViewport = document.querySelector("meta[name=viewport]");
    metaViewport.setAttribute(
      "content",
      "height=" +
        window.innerHeight +
        "px, width=device-width, initial-scale=1.0"
    );

    gsap.from(".g-animi", {
      duration: 0.7,
      opacity: 0,
      y: -20,
      ease: "back.out",
      stagger: 0.2,
    });
    gsap.to(".g-animi-btn", {
      duration: 1,
      opacity: 1,
      stagger: 0.1,
    });
  },
};
</script>

<style scoped>
.g-animi-btn {
  opacity: 0;
}
p {
  font-family: "Roboto";
  float: right;
  color: #651fff;
}
.btns {
  width: 95%;
}
#text-div {
  padding-top: 40px;
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: block;
  margin: 0 auto;
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
