<template>
  <div>
    <div id="container">
      <img class="g-animi" src="../assets/logo.svg" />
      <div id="text-div">
        <v-text-field
          label="Email"
          append-icon="mdi-email-outline"
          color="deep-purple accent-3"
          type="email"
          :counter="35"
          v-model="email"
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

        <p class="g-animi mt-3">Forgot Password ?</p>
      </div>
    </div>

    <div id="container-bottom">
      <v-btn
        :disabled="
          this.email.trim().length < 10 ||
          this.password.trim() === '' ||
          this.password.length < 6 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            ? true
            : false
        "
        class="btns mb-9 g-animi-btn"
        large
        :dark="
          this.email.trim().length < 10 ||
          this.password.trim() === '' ||
          this.password.length < 6 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            ? false
            : true
        "
        color="deep-purple accent-3"
        @click="goForAuth"
        @keyup.enter="goForAuth"
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

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="370">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="display: none" v-bind="attrs" v-on="on"> </v-btn>
          </template>
          <v-card justify="center">
            <v-card-text>
              <div style="text-align: center">
                <img style="zoom: 0.3" src="../assets/load.gif" alt="" />
                <p class="text-h5 mt-n7" style="width: 100%">Authenticating</p>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import gsap from "gsap";
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      dialog: false,
    };
  },
  methods: {
    goToSignup() {
      this.$router.push("/signup");
    },
    async goForAuth() {
      this.dialog = true;
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          // Success
          await firebase
            .firestore()
            .collection("user_list")
            .where("user.email", "==", this.email)
            .get()
            .then((res) => {
              this.$store.commit("setUser", res.docs[0].data().user);
              this.$router.push("/home");
            });
        })
        .catch((error) => {
          console.log(error.code, error.message);
          alert("Error while login into account:" + error.message);
        });
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
      x: -20,
      ease: "back.out",
      stagger: 0.2,
    });
    gsap.fromTo(
      ".g-animi-btn",
      {
        duration: 1,
        opacity: 0,
        x: -20,
        stagger: 0.1,
      },

      {
        duration: 1,
        opacity: 1,
        x: 0,
        stagger: 0.1,
      }
    );
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
