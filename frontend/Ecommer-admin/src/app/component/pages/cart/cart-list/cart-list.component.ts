import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  carts: any []=[] ;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllCarts();
    }

  async getAllCarts() {
    try {
      const response = await this.cartService.getAllCarts();
      console.log("Dữ liệu nhận được từ API:", response);

      if (!response || !Array.isArray(response)) {
        throw new Error("Dữ liệu API không phải là mảng!");
      }

      this.carts = response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách giỏ hàng:", error);
      this.carts = [];
    }
  }
}
