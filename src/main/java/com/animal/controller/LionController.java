package com.animal.controller;

import com.animal.model.Lion;
import com.animal.service.LionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for managing lions.
 */
@RestController
@RequestMapping("/api/lions")
public class LionController {
    
    @Autowired
    private LionService lionService;
    
    /**
     * Get all lions.
     * @return List of all lions
     */
    @GetMapping
    public List<Lion> getAllLions() {
        return lionService.getAllLions();
    }
    
    /**
     * Get a lion by ID.
     * @param id The ID of the lion to retrieve
     * @return The lion if found, 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Lion> getLionById(@PathVariable Long id) {
        return lionService.getLionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create a new lion.
     * @param lion The lion to create
     * @return The created lion
     */
    @PostMapping
    public Lion addLion(@RequestBody Lion lion) {
        return lionService.addLion(lion);
    }
    
    /**
     * Update an existing lion.
     * @param id The ID of the lion to update
     * @param lion The updated lion data
     * @return The updated lion if found, 404 if not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Lion> updateLion(@PathVariable Long id, @RequestBody Lion lion) {
        Lion updatedLion = lionService.updateLion(id, lion);
        return updatedLion != null ? ResponseEntity.ok(updatedLion) : ResponseEntity.notFound().build();
    }
    
    /**
     * Delete a lion.
     * @param id The ID of the lion to delete
     * @return 200 OK if successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLion(@PathVariable Long id) {
        lionService.deleteLion(id);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Get all lions of a specific species.
     * @param species The species to search for
     * @return List of lions of the specified species
     */
    @GetMapping("/species/{species}")
    public List<Lion> getLionsBySpecies(@PathVariable String species) {
        return lionService.getLionsBySpecies(species);
    }
    
    /**
     * Search for lions by name.
     * @param name The name to search for
     * @return List of lions whose names contain the search string
     */
    @GetMapping("/search")
    public List<Lion> getLionsByNameContaining(@RequestParam String name) {
        return lionService.getLionsByNameContaining(name);
    }
    
    /**
     * Get all lions from a specific habitat.
     * @param habitat The habitat to search for
     * @return List of lions from the specified habitat
     */
    @GetMapping("/habitat/{habitat}")
    public List<Lion> getLionsByHabitat(@PathVariable String habitat) {
        return lionService.getLionsByHabitat(habitat);
    }
} 