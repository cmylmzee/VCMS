package com.verseyazilim.cafemanagmentsystem.service;

import com.verseyazilim.cafemanagmentsystem.dto.Purchase;
import com.verseyazilim.cafemanagmentsystem.dto.PurchaseResponse;


public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
