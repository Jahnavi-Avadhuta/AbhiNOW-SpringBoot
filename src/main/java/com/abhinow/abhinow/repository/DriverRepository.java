package com.abhinow.abhinow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

	Optional<Driver> findByUserUserId(Long userId);
	boolean existsByUserUserId(Long userId);
	
}
