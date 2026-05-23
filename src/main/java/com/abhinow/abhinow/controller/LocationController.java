package com.abhinow.abhinow.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abhinow.abhinow.dto.response.ApiResponse;
import com.abhinow.abhinow.entity.Location;
import com.abhinow.abhinow.service.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

	private final LocationService locationService;
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<Location>>> getAllLocations(){
		return ResponseEntity.ok(ApiResponse.success("Locations fetched", locationService.getAllLocations()));
	}
	
	@GetMapping("/search")
	public ResponseEntity<ApiResponse<List<Location>>> search(@RequestParam String query){
		return ResponseEntity.ok(ApiResponse.success("Search results", locationService.searchLocations(query)));
	}
	
}
