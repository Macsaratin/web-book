<template>
    <div>
      <Header />
      <Banner />
      <main class="content">
        <Product />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from "./Header.vue";
  import Banner from "../banner/Banner.vue";
  import Product from "../product/Prouduct.vue";
  import Footer from "./Footer.vue";
  </script>
  
  <style scoped>
  .content {
    padding-top: 80px; 
  }
  </style>
  