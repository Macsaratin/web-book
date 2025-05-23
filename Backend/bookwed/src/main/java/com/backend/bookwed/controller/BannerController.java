package com.backend.bookwed.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.payloads.BannerDTO;
import com.backend.bookwed.service.BannerService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")

public class BannerController {
    @Autowired
    private BannerService bannerService;


    @PostMapping("/admin/banner")
    public ResponseEntity<BannerDTO> createBanner(
            @RequestParam("bannerName") String bannerName,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
    
        Banner banner = new Banner();
        banner.setBannerName(bannerName);
    
        BannerDTO savedBannerDTO = bannerService.createBanner(banner, image);
        return new ResponseEntity<>(savedBannerDTO, HttpStatus.CREATED);
    }
    

    @GetMapping("/admin/banner")
    public ResponseEntity<List<BannerDTO>> getbanner() {
        List<BannerDTO> banner = bannerService.getBannerAll();
        return ResponseEntity.ok(banner);
    }

    
    @GetMapping("/public/banner")
    public ResponseEntity<List<BannerDTO>> getpublicbanner() {
        List<BannerDTO> banner = bannerService.getBannerAll();
        return ResponseEntity.ok(banner);
    }

    
    @PutMapping("/admin/update-status")
    public ResponseEntity<String> updateBannerStatus(@RequestBody Map<String, Object> requestData) {
        Long id = ((Number) requestData.get("id")).longValue();
        Integer status = (Integer) requestData.get("status"); 
        bannerService.updateBannerStatus(id, status);
        return ResponseEntity.ok("Cập nhật trạng thái banner thành công!");
    }


    @GetMapping("/admin/banner/{bannerId}")
    public ResponseEntity<BannerDTO> getBanner(@PathVariable Long bannerId) {
        BannerDTO bannerDTO = bannerService.getBannerById(bannerId);
        return new ResponseEntity<BannerDTO>(bannerDTO, HttpStatus.OK);
    }

    @PutMapping("/admin/banner/{bannerId}")
    public ResponseEntity<BannerDTO> updateBanner(
            @PathVariable Long bannerId, 
            @RequestParam(value = "bannerName", required = false) String bannerName,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "status", required = false) Integer status) {
    
        BannerDTO bannerDTO = bannerService.updateBanner(bannerId, bannerName, image, status);
        return new ResponseEntity<>(bannerDTO, HttpStatus.OK);
    }
    

    @DeleteMapping("/admin/banner/{bannerId}")
    public ResponseEntity<String> deleteBanner(@PathVariable Long bannerId) {
        String status = bannerService.deleteBanner(bannerId);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }
    

    @PutMapping("/admin/banner/{bannerId}/image")
    public ResponseEntity<BannerDTO> updateBannerImage(@PathVariable Long bannerId,
        @RequestParam("image") MultipartFile image) throws IOException {
            BannerDTO updatedBanner = bannerService.updateBannerImage(bannerId, image);
            return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
    }

    
   @GetMapping("/public/images/banners/{fileName}")
   public ResponseEntity<InputStreamResource> getImage(@PathVariable String fileName) throws FileNotFoundException {
       InputStream imageStream = bannerService.getBannerImage(fileName);
       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.IMAGE_PNG);
       headers.setContentDispositionFormData("inline", fileName);
       return new ResponseEntity<>(new InputStreamResource(imageStream), headers, HttpStatus.OK);
   }



}
