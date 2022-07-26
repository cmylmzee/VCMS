package com.verseyazilim.cafemanagmentsystem.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;


    // BURAYA SADECE TABLE NUMBER DA YAPABİLİRİM ONUR ABİYE SOR DAHA SORNASINDA BU PROJENİN ÜZERİNE GİDECEĞİM GELİŞTİRECEĞİM O YÜZDEN BOZMAYADABİLİRİM BU KISMI

    // TO-DO !!!!
    // BURANIN DÜZENLENİŞ ŞEKLİNE GÖRE DİĞER COMMON CLASSES SERVİCES DTO PACKAGE VS. DÜZENLENİCEK
    //

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;


}
