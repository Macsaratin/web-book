import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  imageUrls: { [key: string]: string } = {};
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

      this.products = response;
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
}
