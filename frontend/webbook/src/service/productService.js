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
  },
  async addToCart(product, quantity,cartId) {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng.');
    }
    if (!cartId) {
      throw new Error('Không tìm thấy giỏ hàng của bạn.');
    }
    if (!product || !product.productId) {
      throw new Error('Sản phẩm không hợp lệ.');
    }
    try {
      const response = await axios.post(
        `${API_URL}/public/carts/${cartId}/products/${product.productId}/quantity/${quantity}`,
        { product: product.productId, quantity: product.quantity || 1 },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );      

      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.response?.data || error.message);
      throw new Error('Không thể thêm sản phẩm vào giỏ hàng.');
    }
  },

};
