package com.backend.bookwed.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.exceptions.APIException;
import com.backend.bookwed.exceptions.ResourceNotFoundException;
import com.backend.bookwed.payloads.BannerDTO;
import com.backend.bookwed.repository.BannerRepo;
import com.backend.bookwed.service.BannerService;
import com.backend.bookwed.service.FileService;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class BannerServiceImpl implements BannerService {
    
    @Autowired
    private BannerRepo bannerRepo;
    
    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.image}/banners/")
    private String path;

    private String bannerPath;

    @PostConstruct
    public void init() {
        this.bannerPath = path + "banners/";
    }
    @Override
    public BannerDTO createBanner(Banner banner, MultipartFile image) throws IOException {
            Banner existingBanner = bannerRepo.findByBannerName(banner.getBannerName());
            
            if (existingBanner != null) {
                throw new APIException("Banner already exists !!!");
            }
            if (banner.getStatus() == null) {
                banner.setStatus(1);
            }

            // Kiểm tra xem có ảnh tải lên không
            if (image != null && !image.isEmpty()) {
                String imageUrl = saveImage(image);
                banner.setImage(imageUrl);
            } else {
                banner.setImage("default.png");
            }

            Banner savedBanner = bannerRepo.save(banner);
            
            return modelMapper.map(savedBanner, BannerDTO.class);
    }

    @Override
    public List<BannerDTO> getTrash() {
        List<Banner> banners = bannerRepo.findByStatus(2); // Fetch banners with status 2
        return banners.stream()
            .map(banner -> modelMapper.map(banner, BannerDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public List<BannerDTO> getBannerAll() {
        List<Banner> banners = bannerRepo.findAll();
        return banners.stream()
            .map(banner -> modelMapper.map(banner, BannerDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public void updateBannerStatus(Long id, Integer status) {
        Banner banner = bannerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner", "ID", id));

        banner.setStatus(status);
        bannerRepo.save(banner);
    }
    
    @Override
    public BannerDTO getBannerById(Long bannerId) {
        Banner banner = bannerRepo.findById(bannerId).orElseThrow(() -> new ResourceNotFoundException("Banner", "bannerId", bannerId));
        return modelMapper.map(banner, BannerDTO.class);
    }
// cập nhật hìh ảnh
    @Override
    public BannerDTO updateBanner(Long bannerId, String bannerName, MultipartFile image, Integer status) {
        Banner existingBanner = bannerRepo.findById(bannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Banner", "bannerId", bannerId));

        if (bannerName != null && !bannerName.isEmpty()) {
            existingBanner.setBannerName(bannerName);
        }

        if (image != null && !image.isEmpty()) {
            try {
                String imagePath = saveImage(image);
                existingBanner.setImage(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Lỗi khi lưu hình ảnh", e);
            }
        }

        if (status != null) {
            existingBanner.setStatus(status);
        }

        Banner updatedBanner = bannerRepo.save(existingBanner);
        return modelMapper.map(updatedBanner, BannerDTO.class);
    }

// xoá hình ảnh
@Override
public String deleteBanner(Long bannerId) {
    // Tìm banner trong cơ sở dữ liệu
    Banner banner = bannerRepo.findById(bannerId)
            .orElseThrow(() -> new ResourceNotFoundException("Banner", "bannerId", bannerId));

    // Lấy đường dẫn của file ảnh từ banner (nếu có)
    String imageFileName = banner.getImage();
    
    if (imageFileName != null && !imageFileName.equals("default.png")) {
        // Tạo đường dẫn đầy đủ tới file ảnh trong thư mục lưu trữ
        String filePath = bannerPath + imageFileName;

        // Tạo đối tượng File từ đường dẫn
        File file = new File(filePath);

        // Kiểm tra xem file có tồn tại không, và xóa nếu có
        if (file.exists()) {
            if (file.delete()) {
                System.out.println("File deleted successfully: " + filePath);
            } else {
                throw new APIException("Failed to delete the image file: " + filePath);
            }
        }
    }

    // Xóa banner khỏi cơ sở dữ liệu
    bannerRepo.delete(banner);
    
    // Trả về thông báo
    return "Banner and image deleted successfully with bannerId: " + bannerId;
}

    @Override
    public BannerDTO updateBannerImage(Long bannerId, MultipartFile image) throws IOException {
        Banner bannerFromDB = bannerRepo.findById(bannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Banner", "bannerId", bannerId));
    
        if (bannerFromDB == null) {
            throw new APIException("Banner not found with bannerId: " + bannerId);
        }
    
        String fileName = fileService.uploadImage(path, image);
    
        bannerFromDB.setImage(fileName);
    
        Banner updatedBanner = bannerRepo.save(bannerFromDB);
    
        return modelMapper.map(updatedBanner, BannerDTO.class);
    }

    @Override
    public InputStream getBannerImage(String fileName) throws FileNotFoundException {
        return fileService.getResource(path, fileName);
    }

    @Override
    public String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new APIException("File ảnh không được để trống!");
        }
            String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new APIException("Chỉ được phép tải lên file ảnh (JPG, PNG, JPEG, GIF)!");
        }
            return fileService.uploadImage(path, file);
    }
    
}
