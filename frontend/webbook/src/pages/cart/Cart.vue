<template>
  <div>
    <Header />
    <div class="container-fluid py-5">
      <div class="container py-5">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Price Sale</th>
                <th scope="col">Purchased Quantity</th> <!-- Updated to 'Purchased Quantity' -->
                <th scope="col">Discount</th>
                <th scope="col">Total</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carts" :key="item.productId">
                <th scope="row">
                  <div class="d-flex justify-content-center align-items-center">
                    <img :src="getImageUrl(item.image)" class="img-fluid rounded-circle" alt="Product Image" style="max-height: 100px; width: 100px; object-fit: cover;" />
                  </div>
                </th>
                <td>
                  <p class="mb-0 mt-4">{{ item.productName }}</p>
                </td>
                <td>
                  <p class="mb-0 mt-4">
                    <span v-if="item.discount > 0" style="text-decoration: line-through;">
                      {{ formatCurrency(item.price) }}
                    </span>
                  </p>
                </td>
                <td>
                  <p class="mb-0 mt-4">
                    <span v-if="item.discount > 0">
                      {{ formatCurrency(item.price - (item.price * (item.discount / 100))) }}
                    </span>
                    <span v-else>
                      {{ formatCurrency(item.price) }}
                    </span>
                  </p>
                </td>
                <td>
                  <div class="input-group quantity mt-4" style="width: 100px;">
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-minus rounded-circle bg-light border" @click="changeQuantity(item, 'decrease')" :disabled="item.purchasedQuantity <= 1">
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input type="text" class="form-control form-control-sm text-center border-0" v-model="item.purchasedQuantity" @input="updateTotal(item)" readonly />
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-plus rounded-circle bg-light border" @click="changeQuantity(item, 'increase')" :disabled="item.purchasedQuantity >= item.quantity">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="mb-0 mt-4">{{ item.discount ?? 0 }}%</p>
                </td>
                <td>
                  <p class="mb-0 mt-4">{{ formatCurrency(item.totalPrice) }}</p>
                </td>
                <td>
                  <button class="btn btn-md rounded-circle bg-light border mt-4" @click="removeItem(item.productId)">
                    <i class="fa fa-times text-danger"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="carts.length === 0" class="alert alert-info text-center">
            Your cart is empty.
          </div>
          <div class="row g-4 justify-content-end">
            <div class="col-8"></div>
            <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div class="bg-light rounded">
                <div class="p-4">
                  <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                </div>
                <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 class="mb-0 ps-4 me-4">Total</h5>
                  <p class="mb-0 pe-4">{{ formatCurrency(totalPayment) }}</p>
                </div>
                <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import cartService from '@/service/cartService';
import ProductService from '@/service/productService';
import Footer from '@/pages/Home/Footer.vue';
import Header from '@/pages/Home/Header.vue';
import { useRoute } from 'vue-router';

const carts = ref([]);
const route = useRoute();

const fetchCart = async () => {
  try {
    const email = route.params.email;
    const cartId = localStorage.getItem('cartId');

    if (!email || !cartId) {
      console.error("Missing email or cartId");
      return;
    }

    const response = await cartService.getCart(email, cartId);
    carts.value = response.products;
    
    carts.value.forEach(item => {
      item.purchasedQuantity = item.purchasedQuantity || 0; 
      updateTotal(item);
    });
  } catch (error) {
    console.error("Failed to fetch cart:", error);
  }
};

onMounted(fetchCart);

const getImageUrl = (fileName) => {
  return ProductService.getImageUrl(fileName);
};

// Function to format the amount as currency
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '0₫';
  return amount.toLocaleString('vi-VN') + '₫';
};

// Function to change the quantity of a product in the cart
const changeQuantity = (item, action) => {
  if (action === 'increase' && item.purchasedQuantity < item.quantity) {
    item.purchasedQuantity += 1;
  } else if (action === 'decrease' && item.purchasedQuantity > 1) {
    item.purchasedQuantity -= 1;
  }
  updateTotal(item);
};

// Function to update the total price of an item
const updateTotal = (item) => {
  const originalPrice = item.price ?? 0;
  const discount = item.discount ?? 0;
  const discountedPrice = discount > 0 ? originalPrice - (originalPrice * discount / 100) : originalPrice;
  item.totalPrice = item.purchasedQuantity * discountedPrice;
};

const removeItem = (productId) => {
  carts.value = carts.value.filter(item => item.productId !== productId);
};

const totalPayment = computed(() => {
  return carts.value.reduce((total, item) => total + item.totalPrice, 0);
});
</script>

<style scoped>
.product-image img {
  max-height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
