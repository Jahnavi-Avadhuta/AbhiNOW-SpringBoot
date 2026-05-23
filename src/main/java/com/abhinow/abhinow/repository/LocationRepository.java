package com.abhinow.abhinow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long>{

	Optional<Location> findByLocationName(String locationName);
	List<Location> findByLocationNameContainingIgnoreCase(String query);
	
}
