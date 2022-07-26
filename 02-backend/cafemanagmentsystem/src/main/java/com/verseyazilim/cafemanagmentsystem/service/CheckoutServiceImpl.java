package com.verseyazilim.cafemanagmentsystem.service;

import com.verseyazilim.cafemanagmentsystem.dao.CustomerRepository;
import com.verseyazilim.cafemanagmentsystem.dto.Purchase;
import com.verseyazilim.cafemanagmentsystem.dto.PurchaseResponse;
import com.verseyazilim.cafemanagmentsystem.entity.Customer;
import com.verseyazilim.cafemanagmentsystem.entity.Order;
import com.verseyazilim.cafemanagmentsystem.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements  CheckoutService{


    private CustomerRepository customerRepository;

    @Autowired
    public  CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAdress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);
        // save to the databe
        customerRepository.save(customer);
        // return a response
        return  new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4)
        // FOR DETAİLS SEE https://en.wikipedia.org/wiki/Universally_unique_identifier

        return UUID.randomUUID().toString();

    }
}
