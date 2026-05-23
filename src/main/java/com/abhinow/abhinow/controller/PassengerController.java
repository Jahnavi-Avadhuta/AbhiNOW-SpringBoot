package com.abhinow.abhinow.controller;

import com.abhinow.abhinow.dto.request.RatingRequest;
import com.abhinow.abhinow.dto.request.RideRequestDto;
import com.abhinow.abhinow.dto.request.SearchRideRequest;
import com.abhinow.abhinow.dto.response.ApiResponse;
import com.abhinow.abhinow.dto.response.RatingResponse;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;
import com.abhinow.abhinow.service.PassengerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/passenger")
@RequiredArgsConstructor
public class PassengerController {

    private final PassengerService passengerService;

    // POST /api/passenger/search
    @PostMapping("/search")
    public ResponseEntity<ApiResponse<List<RouteResponse>>> searchRides(
            @Valid @RequestBody SearchRideRequest request) {

        List<RouteResponse> routes =
            passengerService.searchRides(request);
        return ResponseEntity.ok(
            ApiResponse.success("Rides found", routes));
    }

    // POST /api/passenger/book
    @PostMapping("/book")
    public ResponseEntity<ApiResponse<RideResponse>> bookRide(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody RideRequestDto request) {

        RideResponse response = passengerService.bookRide(
            userDetails.getUsername(), request);
        return ResponseEntity.ok(
            ApiResponse.success("Ride booked! Driver will confirm soon 🚗",
                response));
    }

    // GET /api/passenger/rides
    @GetMapping("/rides")
    public ResponseEntity<ApiResponse<List<RideResponse>>> getMyRides(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<RideResponse> rides = passengerService.getMyRides(
            userDetails.getUsername());
        return ResponseEntity.ok(
            ApiResponse.success("Ride history fetched", rides));
    }

    // GET /api/passenger/rides/ongoing
    @GetMapping("/rides/ongoing")
    public ResponseEntity<ApiResponse<List<RideResponse>>> getOngoingRides(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<RideResponse> rides = passengerService.getOngoingRides(
            userDetails.getUsername());
        return ResponseEntity.ok(
            ApiResponse.success("Ongoing rides fetched", rides));
    }

    // POST /api/passenger/rate
    @PostMapping("/rate")
    public ResponseEntity<ApiResponse<RatingResponse>> rateRide(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody RatingRequest request) {

        RatingResponse response = passengerService.rateRide(
            userDetails.getUsername(), request);
        return ResponseEntity.ok(
            ApiResponse.success("Rating submitted! ⭐", response));
    }
}