<template>
  <div>
    <div id="container">
      <img src="../assets/logo.svg" />
      <br />
      <div id="text-div">
        <v-text-field
          label="Phone Number"
          append-icon="mdi-cellphone-basic"
          color="deep-purple accent-3"
          type="number"
          :counter="10"
          @keyup="phoneNumberChange"
          v-model="phone"
        ></v-text-field>
        <v-text-field
          class="mt-3"
          label="Password"
          append-icon="mdi-lock-outline"
          color="deep-purple accent-3"
          type="password"
          v-model="password"
          :counter="20"
        ></v-text-field>

        <p>Forgot Password ?</p>
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
        class="btns mb-7"
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
        class="btns mb-15"
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
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
  float: right;
  color: #651fff;
}
.btns {
  width: 95%;
}
#text-div {
  margin-top: 20px;
  padding-top: 80px;
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#container {
  position: absolute;
  top: 40%;
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
}
</style>
