<template>
  <div class="container-fluid hero-header banner-container">
    <div class="container py-5">
      <div class="row g-5 align-items-center">
        <div class="col-md-12 col-lg-7 text-center text-lg-start">
          <h4 class="mb-3 text-success fw-bold">100% Organic Foods</h4>
          <h1 class="mb-4 display-3 fw-bold text-dark">Organic Veggies & Fruits</h1>
          <p class="lead text-muted">Fresh from the farm to your table</p>
          <div class="position-relative mx-auto d-inline-block">
            <input class="form-control border-2 border-success w-75 py-3 px-4 rounded-pill" type="text" placeholder="Search for organic foods">
            <button type="submit" class="btn btn-success border-2 py-3 px-4 position-absolute rounded-pill text-white" style="top: 0; right: 15%;">Search</button>
          </div>
        </div>
        <div class="col-md-12 col-lg-5">
          <div id="carouselId" class="carousel slide position-relative" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="#st" class="img-fluid w-100 rounded" alt="Fruits">
                <div class="carousel-caption">
                  <a href="#" class="btn btn-warning px-4 py-2 rounded">Fruits</a>
                </div>
              </div>
              <div class="carousel-item">
                <img src="#st" class="img-fluid w-100 rounded" alt="Vegetables">
                <div class="carousel-caption">
                  <a href="#" class="btn btn-warning px-4 py-2 rounded">Vegetables</a>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-header {
  background: linear-gradient(to right, #d4fc79, #96e6a1);
  padding: 80px 0;
  border-radius: 20px;
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
}
</style>
