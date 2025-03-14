import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/pages/layout/layout.component';
import { DashboardComponent } from './component/pages/dashboard-view/dashboard-view.component';
import { LoginComponent } from './component/pages/login/login.component';
import { UserComponent } from './component/pages/user/user.component';
import { BannerViewComponent } from './component/pages/banner/banner-view/banner-view.component';

// Guard để kiểm tra đăng nhập
import { AuthGuard } from './service/auth.guard';
import { UserListComponent } from './component/pages/user/user-list/user-list.component';
import { UserEditComponent } from './component/pages/user/user-edit/user-edit.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { CategoryViewComponent } from './component/pages/category/category-view/category-view.component';
import { BannerPostComponent } from './component/pages/banner/banner-post/banner-post.component';

import { AlreadyAuthGuard } from './service/already-auth-guard.service';
import { ProductListComponent } from './component/pages/product/productlist/productlist.component';
import { BannerEditComponent } from './component/pages/banner/banner-edit/banner-edit.component';
import { BannerTrashComponent } from './component/pages/banner/banner-trash/banner-trash.component';
//
import { CategoryCreateComponent } from './component/pages/category/category-create/category-create.component';
import { CategoryEditComponent } from './component/pages/category/category-edit/category-edit.component';

//
import { ProductCreateComponent } from './component/pages/product/product-create/product-create.component';
import { ProductUpdateComponent } from './component/pages/product/product-update/product-update.component';
import { ProductDetailComponent } from './component/pages/product/product-detail/product-detail.component';
import { ProductTrashComponent } from './component/pages/product/product-trash/product-trash.component';
import { CartListComponent } from './component/pages/cart/cart-list/cart-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Kiểm tra đăng nhập trước khi vào layout
    children: [
      { path: 'dashboard', component: DashboardComponent },
      //category
      {path: 'category', component :CategoryViewComponent},
      {path: 'category/create', component :CategoryCreateComponent},
      {path: 'category/edit/:id', component :CategoryEditComponent},



      //banner 
      { 
        path: 'banner',
        component: BannerViewComponent,
      },
      { path: 'banner/edit/:id', component: BannerEditComponent },
      { path: 'banner/create', component: BannerPostComponent },
      { path: 'banner/trash', component: BannerTrashComponent },

      //
      { path: 'product', component: ProductListComponent },
      { path: 'product/create', component: ProductCreateComponent },
      { path: 'product/detail/:id', component: ProductDetailComponent },
      { path: 'product/trash', component: ProductTrashComponent },
      { path: 'product/edit/:id', component: ProductUpdateComponent },
      //
      { path: 'cart', component: CartListComponent },





      { path: 'user-account', component: UserListComponent},
      { path: 'user-account/edit/:id', component:UserEditComponent },
      { path: 'user', component: UserComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Điều hướng nếu route không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
