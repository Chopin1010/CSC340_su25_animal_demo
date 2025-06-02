package com.animal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "lions")
public class Lion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lionId;
    
    @NotNull
    @Column(nullable = false)
    private String name;
    
    @NotNull
    @Column(nullable = false)
    private String description;
    
    @NotNull
    @Column(nullable = false)
    private String species;
    
    @NotNull
    @Column(nullable = false)
    private String habitat;
    
    @NotNull
    @Column(nullable = false)
    private Double weight;
    
    @NotNull
    @Column(nullable = false)
    private Date birthDate;

    // Default constructor
    public Lion() {
    }

    // Constructor with all fields
    public Lion(String name, String description, String species, String habitat, Double weight, Date birthDate) {
        this.name = name;
        this.description = description;
        this.species = species;
        this.habitat = habitat;
        this.weight = weight;
        this.birthDate = birthDate;
    }

    // Getters and Setters
    public Long getLionId() {
        return lionId;
    }

    public void setLionId(Long lionId) {
        this.lionId = lionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
} 