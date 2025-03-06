import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  async getAllProducts() {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${API_URL}/public/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error.message);
      return [];
    }
  },
  getImageUrl(fileName) {
    const token = localStorage.getItem('jwt-token');
    return token 
      ? `${API_URL}/public/images/products/${fileName}?token=${token}`
      : 'assets/default-image.png';
  }
};
