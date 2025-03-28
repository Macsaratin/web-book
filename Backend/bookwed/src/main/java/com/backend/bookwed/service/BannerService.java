package com.backend.bookwed.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.payloads.BannerDTO;

import jakarta.transaction.Transactional;

public interface BannerService {

BannerDTO createBanner(Banner banner, MultipartFile image) throws IOException;



List<BannerDTO> getBannerAll();

BannerDTO getBannerById(Long bannerId);

List<BannerDTO> getTrash();

BannerDTO updateBanner(Long bannerId, String bannerName, MultipartFile image, Integer status);


String deleteBanner(Long bannerId);

BannerDTO updateBannerImage(Long bannerId, MultipartFile image) throws IOException;

public InputStream getBannerImage(String fileName) throws FileNotFoundException;
public String saveImage(MultipartFile file) throws IOException;

@Transactional
void updateBannerStatus(Long id, Integer status);

}