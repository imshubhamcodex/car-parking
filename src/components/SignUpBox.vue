<template>
  <div>
    <div id="container">
      <img src="../assets/logo.svg" />
      <br />
      <p class="mt-4">
        {{ currentSlide === 0 ? "Enter your details" : "Enter your password" }}
      </p>
    </div>

    <template>
      <v-carousel
        height="260"
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
                  :counter="20"
                  v-model="name"
                ></v-text-field>
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
                  label="Email"
                  append-icon="mdi-email-outline"
                  color="deep-purple accent-3"
                  type="email"
                  :counter="35"
                  v-model="email"
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
                  type="text"
                  :counter="20"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  class="mt-3"
                  label="Confirm Password"
                  append-icon="mdi-lock-outline"
                  color="deep-purple accent-3"
                  type="password"
                  :counter="20"
                  v-model="confirmPassword"
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
        :dark="!btnDisabled()"
        color="deep-purple accent-3"
        :disabled="btnDisabled()"
      >
        {{ currentSlide === 0 ? "NEXT" : "CREATE ACCOUNT" }}
      </v-btn>
      <v-btn
        @click="previousSlide"
        class="btns mb-7"
        large
        :dark="!this.currentSlide == 0"
        color="deep-purple accent-3"
        :disabled="this.currentSlide == 0"
        outlined
      >
        BACK
      </v-btn>
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="370">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="display: none" v-bind="attrs" v-on="on"> </v-btn>
          </template>
          <v-card v-if="!wait" justify="center">
            <v-card-text class="pt-4">
              <div style="text-align: center">
                <img src="../assets/tick.svg" alt="" />
                <p class="text-h5 mt-2">Account successfully created</p>
              </div>
              <v-btn
                @click="goToLogin"
                color="deep-purple accent-3"
                dark
                style="display: block; margin: 5px auto; width: 100%"
              >
                login
              </v-btn>
            </v-card-text>
          </v-card>

          <v-card v-if="wait" justify="center">
            <v-card-text>
              <div style="text-align: center">
                <img style="zoom: 0.3" src="../assets/load.gif" alt="" />
                <p class="text-h5 mt-3">Account creating</p>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      currentSlide: 0,
      phone: "",
      name: "",
      email: "",
      confirmPassword: "",
      password: "",
      dialog: false,
      wait: true,
    };
  },
  methods: {
    goToLogin() {
      this.dialog = false;
      this.$router.push("/login");
    },
    nextSlide() {
      if (this.currentSlide < 1) {
        this.currentSlide++;
        document.getElementsByTagName("button")[this.currentSlide].click();
      } else {
        this.createAccount();
      }
    },
    async createAccount() {
      this.dialog = true;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          const user = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            user_id: firebase.auth().currentUser.uid,
          };
          await firebase
            .firestore()
            .collection("user_list")
            .doc(firebase.auth().currentUser.uid)
            .set(
              {
                user,
              },
              { merge: true }
            );
          this.$store.commit("setUser", user);
          this.wait = false;
        })
        .catch((error) => {
          this.dialog = false;
          console.log(error.code, error.message);
          alert("Error while creating account: " + error.message);
        });
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        document.getElementsByTagName("button")[this.currentSlide].click();
      }
    },
    phoneNumberChange() {
      if (this.phone.length > 10) {
        this.phone = this.phone.substring(0, 10);
      }
      if (!/^[6-9]/.test(this.phone.substring(0, 1))) {
        this.phone = "";
      }
    },
    btnDisabled() {
      if (this.currentSlide === 0) {
        return (
          this.name.trim().length < 3 ||
          this.phone.trim().length < 10 ||
          this.email.trim().length < 10 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        );
      } else if (this.currentSlide === 1) {
        return (
          this.password.trim().length < 6 ||
          this.confirmPassword.trim().length < 6 ||
          this.password !== this.confirmPassword
        );
      } else {
        return false;
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
  margin: 40px auto;
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
