<template>
  <section class="page_404">
    <div class="container">
      <h1 class="text-center mb-1">Page not Found 404 !</h1>
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-10 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg"></div>

            <div class="contant_box_404">
              <h3 class="h2">Look like you're lost</h3>

              <v-btn text outlined elevation="3" class="mt-4">Go to home</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Roboto", sans-serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

@media (max-width: 767px) {
  .four_zero_four_bg {
    margin-top: 0px;
  }
  .four_zero_four_bg h1 {
    font-size: 50px;
  }
  .four_zero_four_bg h3 {
    font-size: 50px;
  }
}
</style>
