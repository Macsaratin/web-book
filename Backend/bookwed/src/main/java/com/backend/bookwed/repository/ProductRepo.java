package com.backend.bookwed.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Product;
import com.backend.bookwed.payloads.ProductDTO;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    // Tìm kiếm sản phẩm theo tên
    Page<Product> findByProductNameContaining(String keyword, Pageable pageDetails);

    // Tìm kiếm sản phẩm theo categoryId
    Page<Product> findByCategoryCategoryId(Long categoryId, Pageable pageable);

    Product save(ProductDTO product);

    List<Product> findByStatus(Integer status);



}
