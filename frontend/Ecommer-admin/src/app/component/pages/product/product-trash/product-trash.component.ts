import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {
  trashProducts: any[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.loadTrashProducts();
  }

  async loadTrashProducts() {
    try {
      this.loading = true;
      const products = await this.productService.getAllProducts();
      
      // Chỉ lấy sản phẩm có trạng thái = 2 (trong thùng rác)
      this.trashProducts = products.filter((product: any) => product.status === 2);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm bị xóa:', error);
    } finally {
      this.loading = false;
    }
  }

  async restoreProduct(id: number) {
    try {
      await this.productService.updateStatusProduct(id, 1); // Đặt trạng thái về 1 (hoạt động)
      this.trashProducts = this.trashProducts.filter((product) => product.productId !== id);
    } catch (error) {
      console.error('Lỗi khi khôi phục sản phẩm:', error);
    }
  }

  async deletePermanently(id: number) {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này?')) return;

    try {
      await this.productService.deleteProduct(id);
      this.trashProducts = this.trashProducts.filter((product) => product.productId !== id);
    } catch (error) {
      console.error('Lỗi khi xóa vĩnh viễn sản phẩm:', error);
    }
  }
}
