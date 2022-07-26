package com.verseyazilim.cafemanagmentsystem.controller;

import com.verseyazilim.cafemanagmentsystem.dto.Purchase;
import com.verseyazilim.cafemanagmentsystem.dto.PurchaseResponse;
import com.verseyazilim.cafemanagmentsystem.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {


    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }


}
