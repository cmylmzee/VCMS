package com.verseyazilim.cafemanagmentsystem.dao;

import com.verseyazilim.cafemanagmentsystem.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {


}
