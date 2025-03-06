<template>
    <div class="container mt-4">
      <h2 class="text-center">User Profile</h2>
      <div class="card">
        <div v-for="user in user" :key="user.userId"  class="card-body">
          <h5 class="card-title">Thông tin cá nhân</h5>
          <p><strong>Tên:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.mobileNumber }}</p>
          <button class="btn btn-danger mt-3" @click="logout">Đăng xuất</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import UserService from "@/service/UserService";
  
  const user = ref({});
  const router = useRouter();
  
  const fetchUserInfo = async () => {
    try {
      const userInfo = await UserService.getUser();
      user.value = userInfo;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("username"); // Xóa thông tin user
    router.push("/"); // Chuyển hướng về trang login
  };
  
  onMounted(fetchUserInfo);
  </script>
<style>
.container {
    max-width: 600px;
    margin: auto;
  }
  
  .card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
</style>  