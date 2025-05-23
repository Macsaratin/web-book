package com.backend.bookwed.service;

import java.util.List;

import com.backend.bookwed.payloads.CartDTO;

public interface CartService {
    CartDTO addProductToCart(Long cartId, Long productId, Integer quantity);
    List<CartDTO> getAllCarts();

    CartDTO getCart(String emaiId, Long cartId);

    CartDTO updateProductQuantityInCart(Long cartId, Long productId, Integer quantity);

    void updateProductInCarts(Long cartId, Long productId);

    String deleteProductFromCart(Long cartId, Long productId);
}