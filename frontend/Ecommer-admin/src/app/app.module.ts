// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/pages/dashboard-view/dashboard-view.component';
import { CategoryViewComponent } from './component/pages/category/category-view/category-view.component';
import { BannerViewComponent } from './component/pages/banner/banner-view/banner-view.component';
import { BannerPostComponent } from './component/pages/banner/banner-post/banner-post.component';
import { LoginComponent } from './component/pages/login/login.component';
import { UserComponent } from './component/pages/user/user.component';
import { UserListComponent } from './component/pages/user/user-list/user-list.component';

import { LayoutComponent } from './component/pages/layout/layout.component';
import { UserEditComponent } from './component/pages/user/user-edit/user-edit.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './component/pages/product/productlist/productlist.component';
import { BannerEditComponent } from './component/pages/banner/banner-edit/banner-edit.component';
import { BannerTrashComponent } from './component/pages/banner/banner-trash/banner-trash.component';
import { CategoryCreateComponent } from './component/pages/category/category-create/category-create.component';
import { CategoryEditComponent } from './component/pages/category/category-edit/category-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryViewComponent,
    BannerViewComponent,
    LoginComponent,
    UserComponent,
    BannerPostComponent,
    UserListComponent,
    ProductListComponent,

    LayoutComponent,
    UserEditComponent,
    RegisterComponent,
    BannerEditComponent,
    BannerTrashComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule ,
    FontAwesomeModule 
  ],
  providers: [], 
  bootstrap: [AppComponent]
  
})
export class AppModule { }
