package com.verseyazilim.cafemanagmentsystem.entity;

import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code" )
    private String code;

    @Column(name = "name")
    private String name;


    // TODO: set up one to many with states
    @OneToMany(mappedBy = "country")
    @JsonIgnore // statesleri yok sayacak ve json olarak göstermeyecek
    private List<State> states;



}
