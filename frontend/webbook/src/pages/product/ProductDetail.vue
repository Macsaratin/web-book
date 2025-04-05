<template>
  <div>
    <Header />
    <div class="container-fluid py-5 mt-5">
      <div class="container py-5">
        <div class="row g-4 mb-5">
          <div class="col-lg-8 col-xl-9">
            <div v-if="product && !loading">
              <div class="row g-4">
                <!-- Ảnh sản phẩm -->
                <div class="col-lg-6">
                  <div class="border rounded">
                    <a href="#">
                      <img :src="getImageUrl(product.image)" class="img-fluid rounded" style="width: 100%;" alt="Product Image">
                    </a>
                  </div>
                </div>
                <!-- Thông tin sản phẩm -->
                <div class="col-lg-6">
                  <h4 class="fw-bold mb-3">{{ product.productName }}</h4>
                  <p class="mb-3">Thể Loại: {{ product.category?.categoryName }}</p>
                  <p class="mb-3"> Nhà Xuất Bản: {{ product.publisher }}</p>
                  <p class="mb-3"> Tình trạng: {{ product.bookCondition }}</p>
                  <p class="mb-3"> Năm xuất bản: {{ product.releaseDate }}</p>
                  <div class="d-flex justify-content-between align-items-center mb-3 price-container">
                  <h5>Giá Sản phẩm:</h5>
                    <p v-if="product.pricesale" class="text-muted text-decoration-line-through mb-0 original-price">
                      {{ formatCurrency(product.price) }}
                    </p>
                    <p class="text-dark fs-5 fw-bold mb-0 sale-price" :class="{ 'text-danger': product.pricesale }">
                      {{ formatCurrency(product.pricesale || product.price) }}
                    </p>
                  </div>
                  <div v-if="product.pricesale" class="mb-3">
                    <span class="text-danger fw-bold">Sale - {{ getDiscountPercentage(product) }}%</span>
                  </div>
                  <div class="d-flex mb-4">
                    <i v-for="n in 5" :key="n" 
                      :class="['fa', 'fa-star', n <= product.rating ? 'text-secondary' : '']"></i>
                  </div>
                  <p class="mb-4">{{ product.shortDescription }}</p>
                  <div class="input-group quantity mb-5" style="width: 100px;">
                    <button class="btn btn-sm btn-minus rounded-circle bg-light border" @click="decreaseQuantity">
                      <i class="fa fa-minus"></i>
                    </button>
                    <input type="text" class="form-control form-control-sm text-center border-0" v-model="quantity">
                    <button class="btn btn-sm btn-plus rounded-circle bg-light border" @click="increaseQuantity">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                  <button  @click="addToCart()" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Thêm vào giỏ
                  </button>

                </div>
              </div>
              <!-- Mô tả sản phẩm -->
              <div class="col-lg-12">
                <nav>
                  <div class="nav nav-tabs mb-3">
                    <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                      id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                      aria-controls="nav-about" aria-selected="true">Mô tả</button>
                  </div>
                </nav>
                <div class="tab-content mb-5">
                  <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                    <p>{{ product.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="loading" class="text-center">
              <p>Đang tải...</p>
            </div>
            <div v-else class="text-center text-danger">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/pages/Home/Header.vue';
import Footer from '@/pages/Home/Footer.vue';
import Cart from '../cart/Cart.vue';

const API_URL = 'http://localhost:8080/api';
const route = useRoute();
const router = useRouter();

const product = ref(null);
const loading = ref(true);
const errorMessage = ref('');
const quantity = ref(1);

onMounted(() => {
  const id = route.params.id;
  if (!id || isNaN(Number(id))) {
    alert("ID sản phẩm không hợp lệ!");
    router.push('/products');
    return;
  }
  getProductDetails(id);
});

async function getProductDetails(id) {
  try {
    const token = localStorage.getItem('jwt-token');
    if (!token) throw new Error("Không tìm thấy token!");

    const { data } = await axios.get(`${API_URL}/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    product.value = data;
    loading.value = false;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    errorMessage.value = "Không thể tải thông tin sản phẩm. Vui lòng thử lại!";
    loading.value = false;
  }
}

function getDiscountPercentage(product) {
  if (!product.pricesale || !product.price) return 0;
  return Math.round(((product.price - product.pricesale) / product.price) * 100);
}

function getImageUrl(fileName) {
  const token = localStorage.getItem('jwt-token');
  return token 
    ? `${API_URL}/public/images/products/${fileName}?token=${token}`
    : '/assets/default-image.png';
}

function formatCurrency(amount) {
  if (!amount) return "0₫";
  return amount.toLocaleString('vi-VN') + "₫";
}

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--;
}

async function addToCart() {
  const token = localStorage.getItem('jwt-token');
  const cartId = localStorage.getItem('cartId');
  const email = localStorage.getItem('email');

  if (!token) {
    alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
    router.push('/login'); 
    return;
  }
  if (!cartId) {
    alert('Không tìm thấy giỏ hàng của bạn!');
    return;
  }

  try {
    const { data: cartData } = await axios.get(`${API_URL}/public/carts/${cartId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const existingProduct = cartData.products.find(item => item.productId === product.value.productId);

    if (existingProduct) {
      alert('Sản phẩm đã có trong giỏ hàng!');
    } else {
      const response = await axios.post(
        `${API_URL}/public/carts/${cartId}/products/${product.value.productId}/quantity/${quantity.value}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
      router.push(`/users/${email}/carts/${cartId}`);
      console.log('Response:', response.data);
    }
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!');
  }
}
</script>

<style scoped>
/* Reset và base styles */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

/* Container styles */
.container-fluid {
width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
}

.container {
max-width: 1140px;
margin: 0 auto;
}

/* Image styles */
img.img-fluid {
max-width: 100%;
height: auto;
object-fit: cover;
}

.border {
border: 1px solid #dee2e6 !important;
}

.rounded {
border-radius: 0.25rem !important;
}

/* Typography */
h4.fw-bold {
font-weight: 700;
font-size: 1.5rem;
color: #333;
}

h5.related-product-title {
font-size: 1.1rem;
font-weight: 600;
color: #333;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

p {
color: #666;
line-height: 1.6;
}

.text-dark.fs-5 {
font-size: 1.25rem !important;
}

.text-danger {
color: #dc3545 !important;
}

/* Rating stars */
.fa-star {
color: #ddd;
}

.fa-star.text-secondary {
color: #f1c40f;
}

/* Quantity controls */
.input-group {
display: flex;
align-items: center;
}

.btn-minus,
.btn-plus {
width: 30px;
height: 30px;
line-height: 30px;
padding: 0;
border: 1px solid #dee2e6;
background-color: #f8f9fa;
transition: all 0.3s ease;
}

.btn-minus:hover,
.btn-plus:hover {
background-color: #e9ecef;
}

.form-control {
width: 40px;
height: 30px;
border: none;
background: transparent;
padding: 0;
}

/* Add to cart button */
.btn {
text-decoration: none;
transition: all 0.3s ease;
}

.btn.border-secondary {
border: 1px solid #6c757d;
color: #007bff;
}

.btn.border-secondary:hover {
background-color: #007bff;
color: white;
border-color: #007bff;
}

.rounded-pill {
border-radius: 50rem !important;
}

.text-primary {
color: #007bff !important;
}

/* Tabs */
.nav-tabs {
border-bottom: 1px solid #dee2e6;
}

.nav-link {
color: #495057;
padding: 0.5rem 1rem;
border: none;
}

.nav-link.active {
color: #007bff;
background-color: transparent;
border-bottom: 2px solid #007bff;
}

/* Tab content */
.tab-content {
padding: 1rem 0;
}

/* Product specs table */
.bg-light {
background-color: #f8f9fa !important;
}

.row.align-items-center {
margin: 0 -15px;
}

.col-6 {
padding: 0 15px;
}

.col-6 p {
margin-bottom: 0;
font-size: 0.9rem;
}

/* Related products */
.related-product-card {
transition: transform 0.3s ease;
cursor: pointer;
}

.related-product-card:hover {
transform: scale(1.05);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sale-label {
top: 10px;
right: 10px;
font-size: 12px;
font-weight: bold;
}

/* Price container */
.price-container {
display: flex;
justify-content: flex-start; /* Đặt giá sát nhau hơn */
align-items: center;
gap: 15px; /* Khoảng cách giữa giá gốc và giá sale */
}

.original-price {
margin-right: 0; /* Xóa margin mặc định */
font-size: 1rem; /* Giảm kích thước giá gốc nếu cần */
}

.sale-price {
margin-left: 0; /* Xóa margin mặc định */
}

/* Responsive adjustments */
@media (max-width: 991px) {
.col-lg-6 {
  flex: 0 0 100%;
  max-width: 100%;
}

h4.fw-bold {
  font-size: 1.25rem;
}

.col-md-4 {
  flex: 0 0 50%;
  max-width: 50%;
}

.price-container {
  gap: 10px; /* Giảm khoảng cách trên màn hình nhỏ */
}
}

@media (max-width: 576px) {
.col-md-4 {
  flex: 0 0 100%;
  max-width: 100%;
}

.price-container {
  flex-direction: column; /* Xếp dọc trên mobile nếu cần */
  align-items: flex-start;
  gap: 5px;
}
}
</style>