package com.abhinow.abhinow.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abhinow.abhinow.entity.Location;
import com.abhinow.abhinow.exception.ResourceNotFoundException;
import com.abhinow.abhinow.repository.LocationRepository;
import com.abhinow.abhinow.service.LocationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

	private final LocationRepository locationRepository;

	@Override
	public List<Location> getAllLocations() {
		return locationRepository.findAll();
	}

	@Override
	public List<Location> searchLocations(String query) {
		return locationRepository.findByLocationNameContainingIgnoreCase(query);
	}

	@Override
	public Location addLocation(String name, double lat, double lon) {
		Location location = Location.builder()
				.locationName(name)
				.latitude(lat)
				.longitude(lon)
				.build();
		return locationRepository.save(location);
	}

	@Override
	public void deleteLocation(Long id) {
		if(!locationRepository.existsById(id)) {
			throw new ResourceNotFoundException("Location not found with id: " + id);
		}
		locationRepository.deleteById(id);
	}
	
}
