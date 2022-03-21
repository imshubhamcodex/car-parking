<template>
  <div>
    <div id="container">
      <img src="../assets/logo.svg" />
      <br />
      <p class="mt-7">Your parking assistant</p>
    </div>
    <div id="container-bottom">
      <img src="../assets/city.svg" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push("/onboarding");
    }, 3000);
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto";
}
#container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#container-bottom {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  display: block;
}
#container-bottom > img {
  margin: 0 auto;
  width: 100%;
  display: block;
}
</style>
