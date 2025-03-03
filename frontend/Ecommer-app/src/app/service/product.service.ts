import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';

  async getAllProducts() {
    try {
      const token = localStorage.getItem('jwt-token'); 
      if (!token) throw new Error("Không tìm thấy token!");
      const response = await axios.get(`${this.apiUrl}/admin/products`, {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      });
      console.log("Dữ liệu nhận được từ API:", response.data);
      return response.data;
  } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      return [];
  }
  }

}
