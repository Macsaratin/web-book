package com.backend.bookwed.service;

import java.util.List;

import com.backend.bookwed.payloads.OrderDTO;
import com.backend.bookwed.payloads.OrderResponse;

public interface OrderService {
    OrderDTO placeOrder(Long userId, Long cartId, String paymentMethod);

    OrderDTO getOrder(Long userId, Long orderId);

    List<OrderDTO> getOrdersByUser(Long userId);

    OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrder(Long userId, Long orderId, String orderStatus);
}