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
        ></v-text-field>
        <v-text-field
          class="mt-3"
          label="Password"
          append-icon="mdi-lock-outline"
          color="deep-purple accent-3"
          type="password"
        ></v-text-field>

        <p>Forgot Password ?</p>
      </div>
    </div>

    <div id="container-bottom">
    <v-btn class="btns mb-7" large dark color="deep-purple accent-3">
        LOGIN
      </v-btn>
      <v-btn text class="btns mb-15"  large  color="deep-purple accent-3">
        SIGN UP
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  font-family: "Roboto";
  float: right;
  color: #651FFF;
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
