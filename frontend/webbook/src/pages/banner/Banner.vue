<template>
  <div class="container-fluid hero-header banner-container" style="margin-top: 90px;">
    <div class="container-fluid p-0">
      <div class="row g-0 align-items-center justify-content-center">
        <div class="col-12">
          <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div v-for="(banner, index) in banners" :key="banner.id" :class="['carousel-item', { active: index === 0 }]">
                <img :src="getImageUrl(banner.image)"
                      class="img-fluid w-100"
                      alt="Banner image"
                      style="height:  85vh; object-fit: cover;">
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

<script setup>
import { ref, onMounted } from 'vue';
import bannerService from '@/service/bannerService';

const banners = ref([]);

const fetchBanners = async () => {
  banners.value = await bannerService.getBanner();
};

onMounted(async () => {
  await fetchBanners();
});

const getImageUrl = (fileName) => {
  return bannerService.getImageUrl(fileName);
};
</script>

<style scoped>
.hero-header {
  background: linear-gradient(to right, #d4fc79, #96e6a1);
  padding: 0;
  border-radius: 0;
  margin-top: 100px;
}
.carousel-control-prev-icon, .carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}
</style>
