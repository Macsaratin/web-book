import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../service/product.service';
import { CategoryService } from '../../../../service/category.service';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  updateProductForm: FormGroup;
  category: any[] = [];
  selectedImage: File | null = null;
  currentImage: string = '';
  productId!:Number;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateProductForm = this.fb.group({
      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      description: [''],
      quantity: [1, Validators.required],
      price: [0, Validators.required],
      discount: [0],
      bookCondition: ['Mới'],
      publisher: [''],
      releaseDate: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(Number(id))) {
      alert("ID sản phẩm không hợp lệ!");
      this.router.navigate(['/product']);
      return;
    }
    
    this.productId = Number(id);
    this.getAllCategories();
    this.getProductDetails();
  }
  
  async getAllCategories() {
    try {
      this.category = await this.categoryService.getAllCategory();
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  }

  async getProductDetails() {
    if (!this.productId) {
      console.error('ID sản phẩm không hợp lệ!');
      this.router.navigate(['/product']);
      return;
    }
  
    try {
      const product = await this.productService.getProductById(this.productId);
      if (!product) {
        alert('Sản phẩm không tồn tại!');
        this.router.navigate(['/product']); 
        return;
      }
  
      this.updateProductForm.patchValue({
        categoryId: product.categoryId,
        productName: product.productName,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        bookCondition: product.bookCondition,
        publisher: product.publisher,
        releaseDate: product.releaseDate
      });
  
      this.currentImage = product.image ? product.image : 'assets/no-image.png';
      } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      alert('Lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại!');
    }
  }
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  async onSubmit() {
    if (this.updateProductForm.invalid) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
  
    if (!this.productId) {
      alert('Không tìm thấy ID sản phẩm hợp lệ!');
      this.router.navigate(['/product']);
      return;
    }
  
    try {
      await this.productService.updateProduct(
        this.productId,
        this.updateProductForm.value,
        this.selectedImage ?? undefined // Chỉ gửi ảnh nếu có ảnh mới
      );
  
      alert('Sản phẩm đã được cập nhật thành công!');
      this.router.navigate(['/product']); 
  
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      alert('Cập nhật sản phẩm thất bại. Vui lòng thử lại!');
    }
  }
  
  

}
