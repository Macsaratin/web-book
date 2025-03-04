import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild('signIn') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['user'] || this.route.snapshot.queryParams['password']) {
      this.router.navigate(['/login']);
    }

    this.errorMessage = ''; // Reset lỗi trước khi đăng nhập
    this.successMessage = ''; // Reset thông báo thành công
  }

  async onLogin() {
    try {
      await this.authService.login({ username: this.username, password: this.password });
      this.errorMessage = '';
      this.successMessage = 'Đăng nhập thành công! Đang chuyển hướng...';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
        this.successMessage = '';
      }, 2000);
    } catch (error: any) {
      this.errorMessage = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
      this.successMessage = '';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Điều hướng sang trang đăng ký
  }
}