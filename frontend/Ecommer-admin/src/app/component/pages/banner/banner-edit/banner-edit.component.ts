import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../../../service/banner.service';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
  bannerForm: FormGroup;
  bannerId!: number;
  imageFile!: File | null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bannerForm = this.fb.group({
      bannerName: ['', Validators.required],
      imageFile: [null],
    });
  }

  ngOnInit(): void {
    this.bannerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBannerData();
  }

  async loadBannerData() {
    try {
      const banner = await this.bannerService.getBannerById(this.bannerId);
      this.bannerForm.patchValue({
        bannerName: banner.bannerName,
      });
    } catch (error) {
      alert('Lỗi khi tải dữ liệu banner');
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.bannerForm.patchValue({ image: file });
    }
  }

  async submitForm() {
    if (this.bannerForm.invalid) return;

    this.loading = true;
    try {
      await this.bannerService.updateBanner(
        this.bannerId,
        this.bannerForm.value.bannerName,
        this.imageFile || undefined
      );
      alert('Cập nhật thành công!');
      this.router.navigate(['/banner']);
    } catch (error) {
      alert('Lỗi khi cập nhật banner');
    } finally {
      this.loading = false;
    }
  }
}
