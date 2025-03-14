<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="text-center">Đăng Ký</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-grid">
          <!-- Cột 1: Thông tin cá nhân -->
          <div class="form-column">
            <div class="input-group">
              <input type="text" v-model="user.firstName" class="form-control" required />
              <label>Họ:</label>

            </div>

            <div class="input-group">
              <input type="text" v-model="user.lastName" class="form-control" required />
              <label>Tên:</label>
            </div>

            <div class="input-group">
              <input type="text" v-model="user.mobileNumber" class="form-control" required />
              <label>Số Điện Thoại:</label>

            </div>

            <div class="input-group">
              <input type="email" v-model="user.email" class="form-control" required />
              <label>Email:</label>

            </div>

            <div class="input-group">
              <input type="password" v-model="user.password" class="form-control" required minlength="6" />
              <label>Mật Khẩu:</label>

            </div>
          </div>

          <!-- Cột 2: Địa chỉ -->
          <div class="form-column">
            <div class="input-group">
              <input type="text" v-model="user.address.street" class="form-control" required />
              <label>Đường:</label>

            </div>

          <div class="input-group">
                  <select v-model="user.address.country" @change="updateCities" class="form-control" required>
                      <option value="" disabled>Chọn Quốc Gia</option>
                      <option v-for="country in countries" :key="country.code" :value="country.name">
                      {{ country.name }}
                      </option>
                  </select>
                  <label>Quốc Gia:</label>

          </div>

          <div class="input-group">
                      <select v-model="user.address.city" class="form-control" required>
                          <option value="" disabled></option>
                          <option v-for="city in availableCities" :key="city" :value="city">
                          {{ city }}
                          </option>
                      </select>
                      <label>Chọn Thành Phố</label>

          </div>

          </div>
        </div>

        <button type="submit" class="btn btn-success btn-block" :disabled="loading">
          <span v-if="loading">Đang đăng ký...</span>
          <span v-else>Đăng Ký</span>
        </button>
<!-- 
        <p class="text-center mt-2">
          Đã có tài khoản? <router-link to="/login">Đăng Nhập</router-link>
        </p> -->

        <p v-if="errorMessage" class="alert alert-danger text-center mt-2">{{ errorMessage }}</p>
        <p v-if="successMessage" class="alert alert-success text-center mt-2">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import authService from '@/service/authService';

export default {
  data() {
    return {
      user: {
        userId: 0,
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        roles: [{ roleId: 102, roleName: 'USER' }],
        address: {
          addressId: 0,
          street: '',
          city: '',
          countries:''
      },
      },
      loading: false,
      errorMessage: '',
      successMessage: '',
      countries: [
      { code: 'VN', name: 'Việt Nam',
      cities: [
              'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre',
              'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Cao Bằng',
              'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
              'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên',
              'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An',
              'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 
              'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 
              'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP. Hồ Chí Minh', 
              'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
      ]},
      { code: 'US', name: 'Hoa Kỳ', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
      { code: 'JP', name: 'Nhật Bản', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Fukuoka'] }
    ],
    availableCities: []
    };
  },
  methods: {
    async handleRegister() {
      this.errorMessage = '';
      this.successMessage = '';

      this.loading = true;
      try {
        await authService.register(this.user);
        this.successMessage = 'Đăng ký thành công! Đang chuyển hướng...';

        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      } finally {
        this.loading = false;
      }
    },
    updateCities() {
    const selectedCountry = this.countries.find(c => c.name === this.user.address.country);
    this.availableCities = selectedCountry ? selectedCountry.cities : [];
    this.user.address.city = '';
  }
  }
};
</script>


<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ce4381, #16acd5);
}

.register-form {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 14px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  text-align: center;
  
}

h2 {
  margin-bottom: 15px;
  color: #fc0808;
  font-family: 'Poppins', sans-serif;
}

.form-grid {
  display: flex;
  gap: 20px;
}

.form-column {
  flex: 1;
}

.input-group {
  position: relative;
  margin-bottom: 15px;
  background: white;

}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 16px;
  background: rgba(142, 139, 139, 0.2);
  color: #0a0000;
  transition: 0.3s;
}

.input-group label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  transition: 0.3s;
}


.input-group input:focus + label,
.input-group input:valid + label {
  top: 5px;
  left: 10px;
  font-size: 12px;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  border: none;
  border-radius: 6px;
  color: rgb(20, 1, 1);
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #0072ff, #00c6ff);
}

.alert {
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

.alert-danger {
  background: rgba(255, 0, 0, 0.3);
  color: white;
}

.alert-success {
  background: rgba(0, 255, 0, 0.3);
  color: white;
}


/* Responsive */
@media (max-width: 600px) {
  .form-grid {
      flex-direction: column;
  }
}
</style>
