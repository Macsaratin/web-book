import axios from "axios";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
 export class CartService{
    private api_urls= 'http://localhost:8080/api';


    async addProductCart(){
        try {
            const token  = localStorage.getItem('jwt-token');
            if(!token) throw new Error ('token incorrect');
            const  response = await axios.post(`${this.api_urls}/admin/carts`,{
                headers:{
                    'Accept':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return [];
            
        }
    }
    async getAllCarts() {
        try {
            const token = localStorage.getItem('jwt-token');
            if (!token) throw new Error('Token không hợp lệ');

            const response = await axios.get(`${this.api_urls}/admin/carts`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Đảm bảo API trả về `purchasedQuantity` trong danh sách sản phẩm
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return [];
        }
    }
 }