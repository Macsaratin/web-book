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
  },
  async getProductById(id) {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");
  
      const response = await axios.get(`${API_URL}/public/products/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Lỗi API (${error.response.status}):`, error.response.data.message || "Lỗi không xác định.");
      } else {
        console.error("Lỗi khi lấy sản phẩm theo ID:", error.message);
      }
      throw error;
    }
  }  

};
