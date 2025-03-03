import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerService } from '../../../../service/banner.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-banner-post',
  templateUrl: './banner-post.component.html',
  styleUrls: ['./banner-post.component.css']
})
export class BannerPostComponent {

  bannerForm: FormGroup;
  imageFile!: File | null;
  loading = false;

 constructor(private fb: FormBuilder, private bannerService: BannerService, private router: Router) {
    this.bannerForm = this.fb.group({
      bannerName: ['', Validators.required],
      image: [null, Validators.required]
    });
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.bannerForm.patchValue({ image: file });
    }
  }
  async submitForm() {
    if (this.bannerForm.invalid || !this.imageFile) return;

    this.loading = true; // Bắt đầu loading
    try {
      await this.bannerService.createBanner(this.bannerForm.value.bannerName, this.imageFile);
      this.bannerForm.reset();
      this.imageFile = null;
      setTimeout(() => {
        this.router.navigate(['/banner']);
      }, 1000);
    } catch (error) {
      alert('Lỗi khi thêm');
    } finally {
      this.loading = false; // Kết thúc loading
    }
  }
}
