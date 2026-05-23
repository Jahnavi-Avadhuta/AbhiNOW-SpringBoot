package com.abhinow.abhinow.service;

import java.util.List;

import com.abhinow.abhinow.dto.request.PostRouteRequest;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;

public interface DriverService {
	RouteResponse postRoute(String email, PostRouteRequest request);
	List<RideResponse> getPendingRequests(String email);
	RideResponse handleRequest(String email, Long requestId, String action);
	RideResponse completeRide(String email, Long rideId);
	List<RideResponse> getMyRides(String email);
}
