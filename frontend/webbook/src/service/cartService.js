import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export default {
  async getCart(email, cartId) {
    try {
      const token = localStorage.getItem('jwt-token');
        if (!token) throw new Error('No token found');
      const response = await axios.get(`${API_URL}/public/users/${email}/carts/${cartId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      return response.data;

    } catch (error) {
      console.error("Failed to fetch cart:", error);
      throw error;
    }
  }
};
