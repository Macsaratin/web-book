import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  async getCategory() {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${API_URL}/public/categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error.message);
      return [];
    }
  },
};
