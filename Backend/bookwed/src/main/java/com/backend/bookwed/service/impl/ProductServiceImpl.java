package com.backend.bookwed.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Category;
import com.backend.bookwed.entity.Product;
import com.backend.bookwed.exceptions.ResourceNotFoundException;
import com.backend.bookwed.payloads.ProductDTO;
import com.backend.bookwed.repository.CategoryRepo;
import com.backend.bookwed.repository.ProductRepo;
import com.backend.bookwed.service.FileService;
import com.backend.bookwed.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;
    
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.image}/products/")
    private String path;

    @Override
    public ProductDTO addProduct(Long categoryId, String productName, String description, Integer quantity, double price, double discount, String bookCondition, String publisher, String releaseDate, MultipartFile image) throws IOException {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
    
        Product product = new Product();
        product.setProductName(productName);
        product.setDescription(description);
        product.setQuantity(quantity);
        product.setPrice(price);
        product.setDiscount(discount);
        product.setBookCondition(bookCondition);
        product.setPublisher(publisher);
        product.setCategory(category);
        product.setPricesale(price - (price * discount / 100)); // Tính giá khuyến mãi
    
        if (releaseDate != null && !releaseDate.isEmpty()) {
            product.setReleaseDate(LocalDate.parse(releaseDate));
        }
        if (image != null && !image.isEmpty()) {
            String fileName = fileService.uploadImage(path, image);
            product.setImage(fileName);
        } else {
            product.setImage("default.png");
        }
    
        Product savedProduct = productRepo.save(product);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public void updateProductStatus(Long productId, Integer status) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
    
        product.setStatus(status);
        productRepo.save(product);
    }

    @Override
    public List<ProductDTO> getTrash() {
        List<Product> products = productRepo.findByStatus(2); // Lấy sản phẩm có status = 2
        return products.stream().map(product -> modelMapper.map(product, ProductDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateProduct(Long productId, Long categoryId, String productName, String description, 
                                    Integer quantity, double price, double discount, String bookCondition, 
                                    String publisher, String releaseDate, MultipartFile image) throws IOException {
        Product existingProduct = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
    
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
    
        // Cập nhật thông tin sản phẩm
        existingProduct.setProductName(productName);
        existingProduct.setDescription(description);
        existingProduct.setQuantity(quantity);
        existingProduct.setPrice(price);
        existingProduct.setDiscount(discount);
        existingProduct.setPricesale(price - (price * discount / 100)); 
        existingProduct.setBookCondition(bookCondition);
        existingProduct.setPublisher(publisher);
        existingProduct.setCategory(category); // Cập nhật danh mục sản phẩm
    
        if (releaseDate != null && !releaseDate.isEmpty()) {
            existingProduct.setReleaseDate(LocalDate.parse(releaseDate));
        }
    
        if (image != null && !image.isEmpty()) {
            String fileName = fileService.uploadImage(path, image);
            existingProduct.setImage(fileName);
        }
    
        Product updatedProduct = productRepo.save(existingProduct);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }
    

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        String fileName = fileService.uploadImage(path, image);
        product.setImage(fileName);

        Product updatedProduct = productRepo.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        productRepo.delete(product);
        return "Product deleted successfully!";
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return products.stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());
    }


    @Override
    public InputStream getProductImage(String fileName) throws FileNotFoundException {
        return fileService.getResource(path, fileName);
    }


}
