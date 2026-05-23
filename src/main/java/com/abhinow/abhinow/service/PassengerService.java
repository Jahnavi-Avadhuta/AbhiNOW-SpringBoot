package com.abhinow.abhinow.service;

import com.abhinow.abhinow.dto.request.RatingRequest;
import com.abhinow.abhinow.dto.request.RideRequestDto;
import com.abhinow.abhinow.dto.request.SearchRideRequest;
import com.abhinow.abhinow.dto.response.RatingResponse;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;
import java.util.List;

public interface PassengerService {
    List<RouteResponse> searchRides(SearchRideRequest request);
    RideResponse bookRide(String email, RideRequestDto request);
    List<RideResponse> getMyRides(String email);
    List<RideResponse> getOngoingRides(String email);
    RatingResponse rateRide(String email, RatingRequest request);
}