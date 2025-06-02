package com.animal.repository;

import com.animal.model.Lion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LionRepository extends JpaRepository<Lion, Long> {
    // Find all lions of a specific species
    List<Lion> findBySpecies(String species);
    
    // Find lions whose names contain the given string
    List<Lion> findByNameContaining(String name);
    
    // Find all lions from a specific habitat
    List<Lion> findByHabitat(String habitat);
} 