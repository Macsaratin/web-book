<template>
  <div v-if="loading" id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50 d-flex align-items-center justify-content-center">
    <div class="spinner-grow text-primary" role="status"></div>
  </div>

  <!-- Navbar Start -->
  <div class="container-fluid fixed-top shadow-sm bg-white header">
    <div class="container px-0">
      <nav class="navbar navbar-light bg-white navbar-expand-xl">
        <router-link to="/" class="navbar-brand">
          <h1 class="text-primary display-6">Books</h1>
        </router-link>
        <button class="navbar-toggler py-2 px-3" type="button" @click="toggleMenu">
          <span class="fa fa-bars text-primary"></span>
        </button>
        <div :class="['collapse navbar-collapse bg-white', { 'show': isMenuOpen }]">
          <div class="navbar-nav mx-auto">
            <router-link to="/" class="nav-item nav-link" active-class="active">Home</router-link>
            <router-link to="#st" class="nav-item nav-link">Shop</router-link>
            <router-link to="#st" class="nav-item nav-link">Shop Detail</router-link>
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" @click.prevent="toggleDropdown">Pages</a>
              <div v-if="isDropdownOpen" class="dropdown-menu m-0 bg-secondary rounded-0">
                <router-link to="/cart" class="dropdown-item">Cart</router-link>
                <router-link to="#st" class="dropdown-item">Checkout</router-link>
                <router-link to="#st" class="dropdown-item">Testimonial</router-link>
                <router-link to="#st" class="dropdown-item">404 Page</router-link>
              </div>
            </div>
            <router-link to="#st" class="nav-item nav-link">Contact</router-link>
          </div>
          <div class="d-flex m-3 me-0">
            <button class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" @click="openSearch">
              <i class="fas fa-search text-primary"></i>
            </button>
            <router-link 
              :to="{
                path: '/users/' + email + '/carts/' + cartId,
                query: { cartCount: cartCount }
              }" 
              class="position-relative me-4 my-auto">
              <i class="fa fa-shopping-bag fa-2x"></i>
              <span class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" 
                style="top: -5px; left: 15px; height: 20px; min-width: 20px;">
                {{ cartCount }}
              </span>
            </router-link>

            <div class="my-auto">
              <router-link to="/profile" class="my-auto">
                <i class="fas fa-user fa-2x"></i>
              </router-link>
              <span v-if="user.email" class="text-primary fw-bold" style="cursor: pointer;">
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , nextTick  } from 'vue';
import UserService from '@/service/UserService';

const loading = ref(true);
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const cartCount = ref(3);
const user = ref({});

const email = localStorage.getItem('email');
const cartId = localStorage.getItem('cartId');

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      console.log("No token found");
      return;
    }

    const users = await UserService.getUsers();
    const currentUser = users.find(u => u.token === token);
    if (currentUser) {
      user.value = currentUser;
      return;
    }
    const email = localStorage.getItem('email');
    if (email) {
      const userData = await UserService.getUserInfo(email);
      user.value = userData || {};
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    user.value = {};
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchUser();

  nextTick(() => {
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");

      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    });
  });
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const openSearch = () => {
  console.log("Search clicked");
};
</script>

<style scoped>
.navbar-nav .nav-link.active {
  font-weight: bold;
  color: #007bff !important;
}

.header {
  transition: all 0.3s ease-in-out;
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
}

.banner-container {
  margin-top: 85px;
}

.text-primary {
  color: #007bff !important;
}

.fw-bold {
  font-weight: 700;
}
</style>