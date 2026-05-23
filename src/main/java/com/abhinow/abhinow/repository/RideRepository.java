package com.abhinow.abhinow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Ride;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long>{

	Optional<Ride> findByRequestRequestId(Long requestId);
	@Query("SELECT r FROM Ride r WHERE r.request.passenger.passengerId = :passengerId")
    List<Ride> findByPassengerId(Long passengerId);
    @Query("SELECT r FROM Ride r WHERE r.request.route.driver.driverId = :driverId")
    List<Ride> findByDriverId(Long driverId);
	
}
