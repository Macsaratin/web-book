<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/login" class="nav-link">Login</router-link>
  </nav>

  <router-view></router-view>
</template>

<style scoped>
.navbar {
  background-color: #007bff;
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Định dạng router-link */
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #ffcc00;
}

.router-link-active {
  text-decoration: underline;
}
</style>
