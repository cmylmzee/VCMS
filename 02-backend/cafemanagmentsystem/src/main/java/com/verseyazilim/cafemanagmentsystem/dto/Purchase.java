package com.verseyazilim.cafemanagmentsystem.dto;

import com.verseyazilim.cafemanagmentsystem.entity.Address;
import com.verseyazilim.cafemanagmentsystem.entity.Customer;
import com.verseyazilim.cafemanagmentsystem.entity.Order;
import com.verseyazilim.cafemanagmentsystem.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;



}
