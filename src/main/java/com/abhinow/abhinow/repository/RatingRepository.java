package com.abhinow.abhinow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

	boolean existsByRideRideId(Long rideId);

	Optional<Rating> findByRideRideId(Long rideId);

	List<Rating> findByDriverDriverId(Long driverId);

	@Query("SELECT AVG(r.stars) FROM Rating r WHERE r.driver.driverId = :driverId")
	Double findAverageRatingByDriverId(Long driverId);

}
