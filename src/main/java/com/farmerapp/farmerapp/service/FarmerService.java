package com.farmerapp.farmerapp.service;

import com.farmerapp.farmerapp.model.Farmer;
import com.farmerapp.farmerapp.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FarmerService {

    @Autowired
    private FarmerRepository farmerRepository;

    public Farmer saveFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    public List<Farmer> getAllFarmers() {
    return farmerRepository.findAll();
}

public Farmer updateFarmer(Long id, Farmer updatedFarmer) {

    Farmer farmer = farmerRepository.findById(id).orElseThrow();

    farmer.setName(updatedFarmer.getName());
    farmer.setMobile(updatedFarmer.getMobile());
    farmer.setVillage(updatedFarmer.getVillage());

    return farmerRepository.save(farmer);
}

public void deleteFarmer(Long id) {
    farmerRepository.deleteById(id);
}
}