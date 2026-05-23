package com.abhinow.abhinow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Passenger;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {

	Optional<Passenger> findByUserUserId(Long userId);
	boolean existsByUserUserId(Long userId);
	
}
