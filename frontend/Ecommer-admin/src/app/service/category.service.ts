import { Injectable } from '@angular/core';
import axios from 'axios';
import { error } from 'console';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor() { }

  async getAllCategory() {
    try {
        const token = localStorage.getItem('jwt-token'); 
        if (!token) throw new Error("Không tìm thấy token!");
        const response = await axios.get(`${this.apiUrl}/admin/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log("Dữ liệu nhận được từ API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
        return [];
    }
}
async PostCategory(categoryName: string){
    try{
        const token = localStorage.getItem('jwt-token');
        if(!token) throw new Error("Lỗi  khi kiểm tra token!");
        const formData = new FormData();
        formData.append("categoryName",categoryName);
        const response = await axios.post(`${this.apiUrl}/admin/categories`,formData,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'      
            }
        });
        console.log('category được tạo thành công:', response.data);
    } catch (error:any){
        console.log("lỗi khi tạo category:" ,  error.response?.data || error.messageo);
        throw error;   
    }
}

async getCategoryById(id: number) {
    try {
      const token = localStorage.getItem('jwt-token'); 
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${this.apiUrl}/admin/categories/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy category theo ID:", error);
      throw error;
    }
  }

  async updateCategory(id: number, categoryName: string) {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");
  
      const response = await axios.put(`${this.apiUrl}/admin/categories/${id}`, 
        { categoryName }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật category:", error);
      throw error;
    }
  }
  
}
