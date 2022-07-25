package com.verseyazilim.cafemanagmentsystem.dao;

import com.verseyazilim.cafemanagmentsystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {



}
