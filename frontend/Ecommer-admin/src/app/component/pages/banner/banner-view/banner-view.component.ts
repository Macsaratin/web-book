import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../../service/banner.service';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.css']
})
export class BannerViewComponent implements OnInit {
  banner: any[] = [];
  imageUrls: { [key: string]: string } = {};

  currentPage: number = 1;  
  itemsPerPage: number = 4;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.getAllBanner();
  }

  async getAllBanner() {
    try {
      const response = await this.bannerService.getAllBanner();
      console.log("Dữ liệu nhận được từ API:", response);

      if (!Array.isArray(response)) {
        throw new Error("Dữ liệu API không phải là mảng!");
      }

      this.banner = response;

      this.banner.forEach(b => console.log("Banner Image:", b.image));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      this.banner = [];
    }
  }
  // async loadImage(bannerId: number, fileName: string) {
  //   try {
  //     const token = localStorage.getItem('jwt-token');
  //     if (!token) throw new Error("Không tìm thấy token!");

  //     const response = await fetch(`http://localhost:8080/api/public/images/banners/${fileName}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       }
  //     });

  //     if (!response.ok) throw new Error("Lỗi khi tải hình ảnh!");

  //     const imageUrl = URL.createObjectURL(await response.blob());
  //     this.imageUrls[bannerId] = imageUrl;
  //   } catch (error) {
  //     console.error("Lỗi khi lấy hình ảnh:", error);
  //     this.imageUrls[bannerId] = 'assets/default-image.png'; // Ảnh mặc định nếu lỗi
  //   }
  // }

  getImageUrl(fileName: string): string {
    const token = localStorage.getItem('jwt-token');
    return token 
      ? `http://localhost:8080/api/public/images/banners/${fileName}?token=${token}` 
      : 'assets/default-image.png';
  }

  
  async statusBanner(id: number) {
    const bannerItem = this.banner.find((b) => b.bannerId === id);
    
    if (!bannerItem) return;
    const newStatus = bannerItem.status === 1 ? 0 : 1;
    try {
        await this.bannerService.updateBannerStatus(id, newStatus); 
        bannerItem.status = newStatus;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái banner:", error);
    }
}

async moveToTrash(id: number) {
  if (!confirm("Bạn có chắc chắn muốn chuyển banner này vào thùng rác?")) return;

  try {
      await this.bannerService.moveToTrash(id);
      this.banner = this.banner.filter(b => b.bannerId !== id);
  } catch (error) {
      console.error("Lỗi khi chuyển vào thùng rác:", error);
  }
}

  
}