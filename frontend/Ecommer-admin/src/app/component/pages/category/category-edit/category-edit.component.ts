import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategoryData();
  }

  async loadCategoryData() {
    try {
      const category = await this.categoryService.getCategoryById(this.categoryId);
      this.categoryForm.patchValue({
        categoryName: category.categoryName,
      });
    } catch (error) {
      alert('Lỗi khi tải dữ liệu category');
    }
  }

  async submitForm() {
    if (this.categoryForm.invalid) return;
  
    this.loading = true;
    try {
      const result = await this.categoryService.updateCategory(
        this.categoryId,  
        this.categoryForm.value.categoryName
      );
      
      console.log("Kết quả cập nhật:", result);
      alert('Cập nhật thành công!');
      this.router.navigate(['/category']); 
  
    } catch (error : any) {
      console.error("Chi tiết lỗi cập nhật:", error);
      alert(`Lỗi khi cập nhật category: ${error.message}`);
    } finally {
      this.loading = false;
    }
  }
  
}
