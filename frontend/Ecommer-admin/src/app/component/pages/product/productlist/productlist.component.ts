import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-list',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  imageUrls: { [key: string]: string } = {};
  currentPage: number = 1;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  async loadProducts() {
    try {
      const response = await this.productService.getAllProducts();
      console.log("Dữ liệu nhận được từ API:", response);

      if (!Array.isArray(response)) {
        throw new Error("Dữ liệu API không phải là mảng!");
      }
      this.products = response.filter(product => product.status === 0 || product.status === 1);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      this.products = [];
    }
  }

  getImageUrl(fileName: string): string {
    const token = localStorage.getItem('jwt-token');
    return token 
      ? `http://localhost:8080/api/public/images/products/${fileName}?token=${token}` 
      : 'assets/default-image.png';
  }
  async statusProduct(id: number) {
    const productItemp = this.products.find((b) => b.productId === id);
      
    if (!productItemp) return;
    const newStatus = productItemp.status === 1 ? 0 : 1;
    try {
        await this.productService.updateStatusProduct(id, newStatus); 
        productItemp.status = newStatus;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái sản phẩm:", error);
    }
}

async moveToTrash(id: number) {
  if (!confirm("Bạn có chắc chắn muốn chuyển sản phẩm này vào thùng rác?")) return;

  try {
      await this.productService.getTrash(id);
      this.products = this.products.filter(b => b.productId !== id);
  } catch (error) {
      console.error("Lỗi khi chuyển vào thùng rác:", error);
  }
}
formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

}
