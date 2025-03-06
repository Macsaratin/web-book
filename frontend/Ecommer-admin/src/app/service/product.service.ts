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
  async postProduct(categoryId: number,product: any, image: File) {
    try {
      const token = localStorage.getItem('jwt-token');
      if(!token) throw new Error ("Không tìm thấy token!");
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('description', product.description);
      formData.append('quantity', product.quantity);
      formData.append('price', product.price);
      formData.append('discount', product.discount);
      formData.append('bookCondition', product.bookCondition);
      formData.append('publisher', product.publisher);
      formData.append('releaseDate', product.releaseDate); // YYYY-MM-DD
      formData.append('image', image);
  
      const response = await axios.post(`${this.apiUrl}/admin/categories/${categoryId}/products`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product được tạo thành công:', response.data);
      return response.data;
    } catch (error : any) {

      console.error('Lỗi khi tạo banner:', error.response?.data || error.message);
      throw error
      
    }
  }

  async updateProduct(id: Number, product: any, image?: File): Promise<any> {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");
        if (!image) {
        const response = await axios.put(`${this.apiUrl}/admin/products/${id}`, product, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      }
      const formData = new FormData();
      formData.append('categoryId', product.categoryId.toString());
      formData.append('productName', product.productName);
      formData.append('description', product.description);
      formData.append('quantity', product.quantity.toString());
      formData.append('price', product.price.toString());
      formData.append('discount', product.discount.toString());
      formData.append('bookCondition', product.bookCondition);
      formData.append('publisher', product.publisher);
      formData.append('releaseDate', product.releaseDate);
      formData.append('image', image);
  
      const response = await axios.put(`${this.apiUrl}/admin/products/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      throw error;
    }
  }
  
  
  async getProductById(id: Number) {
    try {
      const token = localStorage.getItem('jwt-token'); 
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${this.apiUrl}/admin/products/${id}`, {
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

  async updateProductImage(productId: Number, image: File) {
    try {
        const token = localStorage.getItem('jwt-token');
        if (!token) throw new Error("Không tìm thấy token!");

        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.put(`${this.apiUrl}/admin/products/${productId}/image`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':  'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật ảnh sản phẩm:', error);
        throw error;
    }
}

async updateStatusProduct(id :number, status :number){
  try {
    const token=  localStorage.getItem('jwt-token');
    if(!token) throw new Error("lỗi khi xác nhận token!")
      const response = await axios.put(`${this.apiUrl}/admin/products/status`,
    {id,status},
    {
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi cập nhật ảnh sản phẩm:', error);
    throw error
  }
}

async getTrash(id:number){
  try {
    const token = localStorage.getItem('jwt-token');
    if (!token) throw new Error("Không tìm thấy token!");

    await axios.put(`${this.apiUrl}/admin/products/status`, 
    { id, status: 2 }, // Đặt trạng thái thành 2 (Đã xóa)
    {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    console.log(`sản phẩm ID ${id} đã được chuyển vào thùng rác`);
} catch (error) {
    console.error("Lỗi khi chuyển sản phẩm vào thùng rác:", error);
    throw error;
}

}


async deleteProduct(id: number) {
  try {
    const token = localStorage.getItem('jwt-token');
    if (!token) throw new Error("Không tìm thấy token!");
    await axios.delete(`${this.apiUrl}/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(`sản phẩm ID ${id} đã bị xóa`);
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
}
}
