<template>
    <div class="login-container">
      <div class="login-box">
        <h1 class="text-center">Đăng Nhập</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Tên Đăng Nhập:</label>
            <input type="text" v-model="username" class="form-control" id="username" required />
          </div>
          <div class="form-group">
            <label for="password">Mật Khẩu:</label>
            <input type="password" v-model="password" class="form-control" id="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading">Đang đăng nhập...</span>
            <span v-else>Đăng Nhập</span>
          </button>
          <p class="text-center mt-2">
            Chưa có tài khoản? <router-link to="/register">Đăng Ký</router-link>
          </p>
          <p v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import authService from '@/service/authService';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        loading: false,
        errorMessage: ''
      };
    },
    methods: {
      async handleLogin() {
        this.loading = true;
        this.errorMessage = '';
  
        try {
          await authService.login(this.username, this.password);
          this.$router.push('/');
        } catch (error) {
          this.errorMessage = error.message;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #ce4381, #16acd5);
  }
  
  .login-box {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-block {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  