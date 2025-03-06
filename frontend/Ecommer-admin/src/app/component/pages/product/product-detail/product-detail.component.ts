import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product: any = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(Number(id))) {
      alert("ID sản phẩm không hợp lệ!");
      this.router.navigate(['/product']);
      return;
    }

    this.productId = Number(id);
    this.getProductDetails();
  }

  async getProductDetails() {
    try {
      this.product = await this.productService.getProductById(this.productId);
      this.loading = false;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      this.errorMessage = "Không thể tải sản phẩm. Vui lòng thử lại!";
      this.loading = false;
    }
  }
  getImageUrl(fileName: string): string {
    const token = localStorage.getItem('jwt-token');
    return token 
      ? `http://localhost:8080/api/public/images/products/${fileName}?token=${token}` 
      : 'assets/default-image.png';
  }
}
