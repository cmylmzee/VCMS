package com.verseyazilim.cafemanagmentsystem.service;

import com.verseyazilim.cafemanagmentsystem.dto.Purchase;
import com.verseyazilim.cafemanagmentsystem.dto.PurchaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
