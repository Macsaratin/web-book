import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  // Fetch a list of users
  async getUsers() {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${API_URL}/public/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Ensure that the response contains the data we expect
      if (response.data && Array.isArray(response.data.users)) {
        return response.data.users;  // Return the list of users
      } else {
        throw new Error("Dữ liệu người dùng không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error.message);
      return [];  // Return an empty array if there's an error
    }
  },

  // Fetch a user by email
  async getUserInfo(email) {
    try {
      if (!email) throw new Error("Email không hợp lệ!");

      const token = localStorage.getItem("jwt-token");
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${API_URL}/public/users/email/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Check if response data exists
      if (response.data) {
        return response.data;  // Return user information
      } else {
        throw new Error("Không tìm thấy thông tin người dùng!");
      }
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin người dùng (${email}):`, error.message);
      return null;  // Return null if user info could not be fetched
    }
  }
};
