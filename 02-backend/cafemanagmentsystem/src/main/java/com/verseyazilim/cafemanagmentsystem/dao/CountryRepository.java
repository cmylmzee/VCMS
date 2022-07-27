package com.verseyazilim.cafemanagmentsystem.dao;

import com.verseyazilim.cafemanagmentsystem.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin // bu bağlantının repoya ulaşmasına izin veriyor
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
