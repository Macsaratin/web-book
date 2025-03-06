import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'http://localhost:8080/api';

  //  Tạo mới banner (gửi ảnh và tên)
  async createBanner(bannerName: string, imageFile: File) {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const formData = new FormData();
      formData.append('bannerName', bannerName);
      formData.append('image', imageFile);

      const response = await axios.post(`${this.apiUrl}/admin/banner`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Banner được tạo thành công:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Lỗi khi tạo banner:', error.response?.data || error.message);
      throw error;
    }
  }

  // Lấy banner theo ID
  async getBannerById(id: number) {
    try {
      const token = localStorage.getItem('jwt-token'); 
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${this.apiUrl}/admin/banner/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy banner theo ID:", error);
      throw error;
    }
  }

  async getAllBanner() {
    try {
      const token = localStorage.getItem('jwt-token'); 
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await axios.get(`${this.apiUrl}/admin/banner`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log("Danh sách banner:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
      return [];
    }
  }

  async updateBanner(id: number, bannerName: string, imageFile?: File | null) {
    const token = localStorage.getItem('jwt-token'); 
    if (!token) throw new Error("Không tìm thấy token!");
    if (!imageFile) {
      return axios.put(`${this.apiUrl}/admin/banner/${id}`, { bannerName });
    }
    const formData = new FormData();
    formData.append('bannerName', bannerName);
    formData.append('image', imageFile);
  
    return axios.put(`${this.apiUrl}/admin/banner/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  
  // 🟢 Xóa banner theo ID
  async deleteBanner(id: number) {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      await axios.delete(`${this.apiUrl}/admin/banner/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(`Banner ID ${id} đã bị xóa`);
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
      throw error;
    }
  }


  async updateBannerStatus(id: number, status: number) {
    try {
        const token = localStorage.getItem('jwt-token'); 
        if (!token) throw new Error("Không tìm thấy token!");

        const response = await axios.put(`${this.apiUrl}/admin/update-status`, 
        { id, status }, 
        {
            headers: {
                'Authorization': `Bearer ${token}`, // Fix lỗi cú pháp ở đây
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái banner:", error);
        throw error;
    }
}

  // 🟢 Lấy ảnh banner
  async getBannerImage(fileName: string) {
    try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      const response = await fetch(`${this.apiUrl}/public/images/banners/${fileName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error("Lỗi khi tải hình ảnh!");

      return URL.createObjectURL(await response.blob());
    } catch (error) {
      console.error("Lỗi khi lấy hình ảnh:", error);
      return 'assets/default-image.png';
    }
  }


  // gettrash
async moveToTrash(id: number) {
  try {
      const token = localStorage.getItem('jwt-token');
      if (!token) throw new Error("Không tìm thấy token!");

      await axios.put(`${this.apiUrl}/admin/update-status`, 
      { id, status: 2 }, // Đặt trạng thái thành 2 (Đã xóa)
      {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      console.log(`Banner ID ${id} đã được chuyển vào thùng rác`);
  } catch (error) {
      console.error("Lỗi khi chuyển banner vào thùng rác:", error);
      throw error;
  }
}

}
