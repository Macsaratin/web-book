<template>
  <div class="container mt-4">
    <h2 class="text-center">User Profile</h2>
    
    <div  v-if = "user "class="card">
      <div class="card-body">
        <h5 class="card-title">Thông tin cá nhân</h5>
        <p><strong>Tên:</strong> {{ user.firstName }} {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.mobileNumber }}</p>            
        <button class="btn btn-danger mt-3" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Header from '../Home/Header.vue';

export default {
  components: {
    Header
  },
  setup() {
    const user = ref(null);
    const errorMessage = ref('');

    const API_URL = 'http://localhost:8080/api';

    const getUserInfo = async (email) => {
      try {
        if (!email) throw new Error('Email không hợp lệ!');

        const token = localStorage.getItem('jwt-token');
        if (!token) throw new Error('Không tìm thấy token!');

        const response = await axios.get(`${API_URL}/public/users/email/${email}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data) {
          user.value = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        errorMessage.value = "Không thể lấy thông tin người dùng. Vui lòng thử lại!";
      }
    };

    const logout = () => {
      localStorage.removeItem('jwt-token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    };

    onMounted(() => {
      const email = localStorage.getItem('username');
      if (email) {
        getUserInfo(email);
      } else {
        window.location.href = '/login';
      }
    });

    return {
      user,
      errorMessage,
      logout
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
