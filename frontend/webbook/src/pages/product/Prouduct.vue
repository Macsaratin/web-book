<template>
  <div class="container-fluid fruite py-5">
    <div class="container py-5">
      <div class="tab-class text-center">
        <div class="row g-4 align-items-center">
          <div class="col-lg-4 text-start">
            <h1>All Products</h1>
          </div>
          <div class="col-lg-8 text-end">
            <ul class="nav nav-pills d-inline-flex text-center mb-5">
              <!-- Hiển thị "All" -->
              <li class="nav-item">
                <a
                  class="d-flex m-2 py-2 bg-light rounded-pill"
                  :class="{ active: !selectedCategory }"
                  @click="setCategory(null)"
                >
                  <span class="text-dark" style="width: 130px;">All</span>
                </a>
              </li>
              
              <!-- Hiển thị tối đa 4 danh mục -->
              <li v-for="(category, index) in visibleCategories" :key="category.categoryId" class="nav-item">
                <a
                  class="d-flex m-2 py-2 bg-light rounded-pill"
                  :class="{ active: selectedCategory === category.categoryId }"
                  @click="setCategory(category.categoryId)"
                >
                  <span class="text-dark" style="width: 130px;">{{ category.categoryName }}</span>
                </a>
              </li>

              <!-- Dropdown nếu có hơn 4 danh mục -->
              <li v-if="hiddenCategories.length" class="nav-item dropdown">
                <a
                  class="d-flex m-2 py-2 bg-light rounded-pill dropdown-toggle"
                  id="categoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="text-dark" style="width: 130px;">More</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
                  <li v-for="category in hiddenCategories" :key="category.categoryId">
                    <a class="dropdown-item" @click="setCategory(category.categoryId)">
                      {{ category.categoryName }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content">
          <div id="tab-1" class="tab-pane fade show p-0 active">
            <div class="row g-4 d-flex flex-wrap justify-content-start">
              <div v-for="product in filteredProducts" :key="product.id" class="col-md-6 col-lg-4 col-xl-3 d-flex">
                <div @click="OneClickDetail(product.productId)"class="rounded position-relative w-100 product-card">
                  <div class="product-image">
                    <img
                      :src="getImageUrl(product.image)"
                      class="img-fluid w-100 rounded-top"
                      alt="Product Image"
                      style="height: 200px; object-fit: cover;"
                    >
                  </div>

                  <div v-if="product.pricesale" class="sale-label text-white bg-danger px-3 py-1 rounded position-absolute">
                    Sale - {{ getDiscountPercentage(product) }}%
                  </div>

                  <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                    {{ product.category.categoryName }}
                  </div>

                  <div class="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column h-100">
                    <h4 class="mb-2 product-title">{{ product.productName }}</h4>
                    <p class="flex-grow-1 product-description">{{ product.description }}</p>

                    <div class="d-flex justify-content-between align-items-center">
                      <p v-if="product.pricesale" class="text-muted text-decoration-line-through mb-0">
                        {{ formatCurrency(product.price) }}
                      </p>
                      <p class="text-dark fs-5 fw-bold mb-0" :class="{ 'text-danger': product.pricesale }">
                        {{ formatCurrency(product.pricesale || product.price) }}
                      </p>
                    </div>

                    <button @click="addToCart(product)" class="btn border border-secondary rounded-pill px-3 text-primary mt-3">
                      <i class="fa fa-shopping-bag me-2 text-primary"></i> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductService from '@/service/productService';
import categoryService from '@/service/categoryService';
import router from '@/router/Router';

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);
const maxVisibleCategories = 3;
const fetchCategories = async () => {
  categories.value = await categoryService.getCategory();
};

const fetchProducts = async () => {
  products.value = await ProductService.getAllProducts();
};

const visibleCategories = computed(() => categories.value.slice(0, maxVisibleCategories));
const hiddenCategories = computed(() => categories.value.slice(maxVisibleCategories));

const filteredProducts = computed(() => {
  return selectedCategory.value
    ? products.value.filter(p => p.category.categoryId === selectedCategory.value)
    : products.value;
});

const setCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const getImageUrl = (fileName) => {
  return ProductService.getImageUrl(fileName);
};

const getDiscountPercentage = (product) => {
  if (!product.pricesale || !product.price) return 0;
  return Math.round(((product.price - product.pricesale) / product.price) * 100);
};

const formatCurrency = (amount) => {
  if (!amount) return "0₫";
  return amount.toLocaleString('vi-VN') + "₫";
};

onMounted(async () => {
  await fetchProducts();
  await fetchCategories();
});
const OneClickDetail = (productId) => {
  router.push(`/product/${productId}`);
};

const addToCart = (product) => {
  console.log(`Thêm vào giỏ: ${product.productName}`);
};
</script>
<style scoped>
.sale-label {
  top: 10px;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
}

.text-danger {
  color: red;
}

.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image img {
  max-height: 200px;
  object-fit: cover;
}

.product-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 2.5em;
}

.product-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 4.5em;
}

.nav-pills .nav-link {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease; /* Added transform transition */
}

.nav-pills .nav-link.active {
  background-color: #007bff !important;
  color: white !important;
  transform: scale(1.05); /* Slight scale on active state */
}

.nav-pills .nav-link:hover:not(.active) {
  background-color: #e9ecef;
  color: #0056b3;
  transform: scale(1.05); /* Scale up by 5% on hover */
}

.dropdown-menu {
  border: 1px solid #e0e0e0; /* Khung viền nhẹ */
  border-radius: 8px; /* Bo góc */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  padding: 10px 0; /* Khoảng cách bên trong */
  background-color: #fff; /* Màu nền trắng */
  min-width: 150px; /* Độ rộng tối thiểu */
  transition: opacity 0.2s ease-in-out; /* Hiệu ứng mượt mà khi hiện/ẩn */
}

/* Style cho từng item trong dropdown */
.dropdown-item {
  padding: 8px 20px; /* Khoảng cách bên trong */
  color: #333; /* Màu chữ */
  font-weight: 500; /* Độ đậm chữ */
  transition: background-color 0.3s ease, color 0.3s ease; /* Hiệu ứng chuyển màu */
}

/* Hiệu ứng hover cho dropdown-item */
.dropdown-item:hover {
  background-color: #f1f3f5; /* Màu nền khi hover */
  color: #007bff; /* Màu chữ khi hover */
  cursor: pointer;
}

/* Style cho nút "More" (dropdown toggle) */
.dropdown-toggle {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.dropdown-toggle:hover {
  background-color: #e9ecef; /* Màu nền khi hover */
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
}

/* Đảm bảo dropdown menu hiển thị mượt mà */
.dropdown-menu.show {
  opacity: 1;
}

/* Các style khác của bạn */
.sale-label {
  top: 10px;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
}

.text-danger {
  color: red;
}

.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image img {
  max-height: 200px;
  object-fit: cover;
}

.product-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 2.5em;
}

.product-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 4.5em;
}

.nav-pills .nav-link {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.nav-pills .nav-link.active {
  background-color: #007bff !important;
  color: white !important;
  transform: scale(1.05);
}

.nav-pills .nav-link:hover:not(.active) {
  background-color: #e9ecef;
  color: #0056b3;
  transform: scale(1.05);
}
</style>