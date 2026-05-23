package com.abhinow.abhinow.service;

import java.util.List;

import com.abhinow.abhinow.entity.Location;

public interface LocationService {
	List<Location> getAllLocations();
	List<Location> searchLocations(String query);
	Location addLocation(String name, double lat, double lon);
	void deleteLocation(Long id);
}
