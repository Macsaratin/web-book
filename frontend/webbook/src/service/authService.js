import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  // Đăng ký người dùng
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}/register`, user, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error.response?.data || error.message);
      throw error;
    }
  },
  // Đăng nhập
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { 
        email: username, 
        password 
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      const { 'jwt-token': token } = response.data;
      
  
      // Store token and userId
      localStorage.setItem('jwt-token', token);
      localStorage.setItem('email', username);
      // Get user cartId
      const userResponse = await axios.get(`${API_URL}/public/users/email/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      const cartId = userResponse.data.cart?.cartId;
      localStorage.setItem('cartId', cartId);
  
      return response.data;
    } catch (error) {
      throw new Error('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
    }
  },
  // Đăng xuất
  logout() {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('username');
    localStorage.removeItem('cartId');
    localStorage.removeItem('email');
    localStorage.removeItem('user');

    this.$router.push('/login');
  },
  // Kiểm tra người dùng đã đăng nhập hay chưa
  isAuthenticated() {
    return !!localStorage.getItem('jwt-token');
  },

  // Lấy thông tin người dùng
  async getUserInfo() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('jwt-token');
  
    if (!username || !token) {
      throw new Error('Không có thông tin người dùng.');
    }
  
    try {
      const response = await axios.get(`${API_URL}/public/users/email/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin người dùng.');
    }
  }
};
