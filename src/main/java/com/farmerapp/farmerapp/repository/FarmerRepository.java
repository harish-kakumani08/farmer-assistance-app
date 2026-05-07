package com.farmerapp.farmerapp.repository;

import com.farmerapp.farmerapp.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
}