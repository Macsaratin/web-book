import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  async getUser() {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${API_URL}/public/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return Array.isArray(response.data.users) ? response.data.users || response.data.addressed || [] : response.data;
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error.message);
      return [];
    }
  },
  async getUserInfo(email) {
    try {
      const token = localStorage.getItem("jwt-token");
      const response = await axios.get(`${this.apiUrl}/public/users/email/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      return null;
    }
  }
};


