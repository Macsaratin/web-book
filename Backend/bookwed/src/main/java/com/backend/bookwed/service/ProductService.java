package com.backend.bookwed.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.backend.bookwed.payloads.ProductDTO;

import jakarta.transaction.Transactional;

public interface ProductService {
    ProductDTO addProduct(Long categoryId, String productName, String description, Integer quantity, double price, double discount, String bookCondition, String publisher, String releaseDate, MultipartFile image) throws IOException;

    List<ProductDTO> getAllProducts();

    // ProductDTO updateProduct(Long productId, com.backend.bookwed.entity.Product product);

    ProductDTO updateProduct(Long productId, Long categoryId, String productName, String description, Integer quantity, 
                                double price, double discount, String bookCondition, String publisher, 
                                String releaseDate, MultipartFile image) throws IOException;

    ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException;

    String deleteProduct(Long productId);

    ProductDTO getProductById(Long productId);
    @Transactional
    public void updateProductStatus(Long productId, Integer status);
    List<ProductDTO> getTrash();

    public InputStream getProductImage(String fileName) throws FileNotFoundException;
    
}
