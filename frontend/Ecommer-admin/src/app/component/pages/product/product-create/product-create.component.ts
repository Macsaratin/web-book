import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../service/product.service';
import { CategoryService } from '../../../../service/category.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  category: any[] = [];
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private router :Router) {

    this.productForm = this.fb.group({
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
    this.getAllCategory();
  }
  async getAllCategory(){
    try {
      const response = await this.categoryService.getAllCategory();
      console.log("Dữ liệu nhận được từ API:", response); 
      if (!Array.isArray(response)) {
          throw new Error("Dữ liệu API không phải là mảng!");
      }

      this.category = response ; 
  } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      this.category = [];
  }

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  async onSubmit() {
    if (this.productForm.invalid || !this.selectedImage) {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh!');
      return;
    }
    try {
      const response = await this.productService.postProduct(
        this.productForm.value.categoryId,
        this.productForm.value,
        this.selectedImage
      );
      alert('Sản phẩm đã được thêm thành công!');
      console.log('Response:', response);
      this.router.navigate(['/product']); 
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      alert('Thêm sản phẩm thất bại.');
    }
  }
}
