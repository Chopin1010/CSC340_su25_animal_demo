package com.animal.service;

import com.animal.model.Lion;
import com.animal.repository.LionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LionService {
    
    @Autowired
    private LionRepository lionRepository;
    
    // Get all lions
    public List<Lion> getAllLions() {
        return lionRepository.findAll();
    }
    
    // Get lion by ID
    public Optional<Lion> getLionById(Long id) {
        return lionRepository.findById(id);
    }
    
    // Add new lion
    public Lion addLion(Lion lion) {
        return lionRepository.save(lion);
    }
    
    // Update existing lion
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
    
    // Delete lion
    public void deleteLion(Long id) {
        lionRepository.deleteById(id);
    }
    
    // Get lions by species
    public List<Lion> getLionsBySpecies(String species) {
        return lionRepository.findBySpecies(species);
    }
    
    // Get lions by name containing
    public List<Lion> getLionsByNameContaining(String name) {
        return lionRepository.findByNameContaining(name);
    }
    
    // Get lions by habitat
    public List<Lion> getLionsByHabitat(String habitat) {
        return lionRepository.findByHabitat(habitat);
    }
} 