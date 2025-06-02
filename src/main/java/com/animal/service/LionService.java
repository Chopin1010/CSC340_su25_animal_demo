package com.animal.service;

import com.animal.model.Lion;
import com.animal.repository.LionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing lions.
 * Handles data access operations.
 */
@Service
public class LionService {
    
    @Autowired
    private LionRepository lionRepository;
    
    /**
     * Get all lions from the database.
     * @return List of all lions
     */
    public List<Lion> getAllLions() {
        return lionRepository.findAll();
    }
    
    /**
     * Get a lion by its ID.
     * @param id The ID of the lion to retrieve
     * @return Optional containing the lion if found, empty if not found
     */
    public Optional<Lion> getLionById(Long id) {
        return lionRepository.findById(id);
    }
    
    /**
     * Create a new lion.
     * @param lion The lion to create
     * @return The created lion
     */
    public Lion addLion(Lion lion) {
        return lionRepository.save(lion);
    }
    
    /**
     * Update an existing lion.
     * @param id The ID of the lion to update
     * @param lionDetails The updated lion data
     * @return The updated lion if found, null if not found
     */
    public Lion updateLion(Long id, Lion lionDetails) {
        Optional<Lion> lion = lionRepository.findById(id);
        if (lion.isPresent()) {
            Lion existingLion = lion.get();
            existingLion.setName(lionDetails.getName());
            existingLion.setDescription(lionDetails.getDescription());
            existingLion.setSpecies(lionDetails.getSpecies());
            existingLion.setHabitat(lionDetails.getHabitat());
            existingLion.setWeight(lionDetails.getWeight());
            existingLion.setBirthDate(lionDetails.getBirthDate());
            return lionRepository.save(existingLion);
        }
        return null;
    }
    
    /**
     * Delete a lion by ID.
     * @param id The ID of the lion to delete
     */
    public void deleteLion(Long id) {
        lionRepository.deleteById(id);
    }
    
    /**
     * Get all lions of a specific species.
     * @param species The species to search for
     * @return List of lions of the specified species
     */
    public List<Lion> getLionsBySpecies(String species) {
        return lionRepository.findBySpecies(species);
    }
    
    /**
     * Search for lions by name.
     * @param name The name to search for
     * @return List of lions whose names contain the search string
     */
    public List<Lion> getLionsByNameContaining(String name) {
        return lionRepository.findByNameContaining(name);
    }
    
    /**
     * Get all lions from a specific habitat.
     * @param habitat The habitat to search for
     * @return List of lions from the specified habitat
     */
    public List<Lion> getLionsByHabitat(String habitat) {
        return lionRepository.findByHabitat(habitat);
    }
} 