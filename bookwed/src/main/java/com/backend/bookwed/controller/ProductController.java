package com.backend.bookwed.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.backend.bookwed.payloads.ProductDTO;
import com.backend.bookwed.service.ProductService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/admin/categories/{categoryId}/products")
    public ResponseEntity<ProductDTO> addProduct(
            @PathVariable Long categoryId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("price") double price,
            @RequestParam("discount") double discount,
            @RequestParam("bookCondition") String bookCondition,
            @RequestParam("publisher") String publisher,
            @RequestParam("releaseDate") String releaseDate,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        ProductDTO savedProduct = productService.addProduct(categoryId, productName, description, quantity, price, discount, bookCondition, publisher, releaseDate, image);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/public/products/{productId}")
    public ResponseEntity<ProductDTO> getOneProduct(@PathVariable Long productId) {
        ProductDTO productDTO = productService.getProductById(productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @GetMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        ProductDTO productDTO = productService.getProductById(productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }
    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDTO>> getPublicProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/admin/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long productId,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("price") double price,
            @RequestParam("discount") double discount,
            @RequestParam("bookCondition") String bookCondition,
            @RequestParam("publisher") String publisher,
            @RequestParam("releaseDate") String releaseDate,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
    
        ProductDTO updatedProduct = productService.updateProduct(productId, categoryId, productName, description, quantity, 
                price, discount, bookCondition, publisher, releaseDate, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    @PutMapping("/admin/products/status")
    public ResponseEntity<String> updateProductStatus(@RequestBody Map<String, Object> requestData) {
        Long id = ((Number) requestData.get("id")).longValue();
        Integer status =(Integer) requestData.get("status");
        productService.updateProductStatus(id,status);
        return ResponseEntity.ok("Cập nhật trạng thái sản phẩm thành công!");
    }
    @PutMapping("/admin/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(@PathVariable Long productId,
            @RequestParam("image") MultipartFile image) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        String status = productService.deleteProduct(productId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
    @GetMapping("/public/images/products/{fileName}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String fileName) throws FileNotFoundException {
        InputStream imageStream = productService.getProductImage(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentDispositionFormData("inline", fileName);
        return new ResponseEntity<>(new InputStreamResource(imageStream), headers, HttpStatus.OK);
    }
}
