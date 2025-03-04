import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/service/banner.service';

@Component({
  selector: 'app-banner-trash',
  templateUrl: './banner-trash.component.html',
  styleUrls: ['./banner-trash.component.css']
})
export class BannerTrashComponent implements OnInit {
  trashBanners: any[] = [];
  loading = false;

  constructor(private bannerService: BannerService) {}

  async ngOnInit() {
    this.loadTrashBanners();
  }

  async loadTrashBanners() {
    try {
      this.loading = true;
      const banners = await this.bannerService.getAllBanner();
      this.trashBanners = banners.filter((banner: any) => banner.status === 2);
    } catch (error) {
      console.error('Lỗi khi tải danh sách banner bị xóa:', error);
    } finally {
      this.loading = false;
    }
  }

  async restoreBanner(id: number) {
    try {
      await this.bannerService.updateBannerStatus(id, 0);
      this.trashBanners = this.trashBanners.filter((banner) => banner.bannerId !== id);
    } catch (error) {
      console.error('Lỗi khi khôi phục banner:', error);
    }
  }

  async deletePermanently(id: number) {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn banner này?')) return;

    try {
      await this.bannerService.deleteBanner(id);
      this.trashBanners = this.trashBanners.filter((banner) => banner.bannerId !== id);
    } catch (error) {
      console.error('Lỗi khi xóa vĩnh viễn banner:', error);
    }
  }
}
