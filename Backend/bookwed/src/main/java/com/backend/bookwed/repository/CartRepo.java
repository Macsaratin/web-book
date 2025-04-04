package com.backend.bookwed.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    
    @Query("SELECT c FROM Cart c WHERE c.user.userId = ?1 AND c.id = ?2")
    Cart findCartByUserIdAndCartId(Long userId, Long cartId);

    @Query("SELECT c FROM Cart c WHERE c.user.email = ?1 AND c.id = ?2")
    Cart findCartByEmailAndCartId(String emailId, Long cartId);

    @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems ci JOIN FETCH ci.product p WHERE p.id = ?1")
    List<Cart> findCartsByProductId(Long productId);

    @Query("SELECT ci.cartItemId FROM Cart c JOIN c.cartItems ci WHERE c.user.email = ?1")
    List<Long> findCartItemIdsByEmail(String email);

}