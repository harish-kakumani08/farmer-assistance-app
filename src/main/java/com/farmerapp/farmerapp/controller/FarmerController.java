package com.farmerapp.farmerapp.controller;

import com.farmerapp.farmerapp.model.Farmer;
import com.farmerapp.farmerapp.service.FarmerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farmers")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @PostMapping("/register")
    public Farmer registerFarmer(@RequestBody Farmer farmer) {
        return farmerService.saveFarmer(farmer);
    }

    @GetMapping
public List<Farmer> getAllFarmers() {
    return farmerService.getAllFarmers();
}

@PutMapping("/{id}")
public Farmer updateFarmer(@PathVariable Long id,
                           @RequestBody Farmer farmer) {

    return farmerService.updateFarmer(id, farmer);
}

@DeleteMapping("/{id}")
public String deleteFarmer(@PathVariable Long id) {

    farmerService.deleteFarmer(id);

    return "Farmer deleted successfully";
}
}