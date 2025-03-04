import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categoryform: FormGroup;
  loading= false;

  constructor(private fb:  FormBuilder, private categoryService : CategoryService, private router : Router) {
    this.categoryform= this.fb.group({
      categoryName:['', Validators.required]
    });
   }

  async submitForm(){
    if( this.categoryform.invalid) return;
    this.loading= true;
    try{
      await this.categoryService.PostCategory(this.categoryform.value.categoryName);
      this.categoryform.reset();
      setTimeout(()=>{
        this.router.navigate(['/category']);
      },1500);
    }catch(error){
      alert('Lỗi Khi cố gắng thêm category!');
    } finally{
      this.loading= false;
    }
  } 


}
