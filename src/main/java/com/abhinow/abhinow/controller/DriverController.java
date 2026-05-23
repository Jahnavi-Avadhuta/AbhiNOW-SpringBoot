package com.abhinow.abhinow.controller;

import com.abhinow.abhinow.dto.request.PostRouteRequest;
import com.abhinow.abhinow.dto.response.ApiResponse;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;
import com.abhinow.abhinow.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/driver")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // POST /api/driver/route — post a new route
    @PostMapping("/route")
    public ResponseEntity<ApiResponse<RouteResponse>> postRoute(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PostRouteRequest request) {

        RouteResponse response = driverService.postRoute(
            userDetails.getUsername(), request);
        return ResponseEntity.ok(
            ApiResponse.success("Route posted successfully!", response));
    }

    // GET /api/driver/requests — view pending ride requests
    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<RideResponse>>> getPendingRequests(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<RideResponse> requests = driverService.getPendingRequests(
            userDetails.getUsername());
        return ResponseEntity.ok(
            ApiResponse.success("Pending requests fetched", requests));
    }

    // POST /api/driver/requests/{requestId}/handle?action=ACCEPT or REJECT
    @PostMapping("/requests/{requestId}/handle")
    public ResponseEntity<ApiResponse<RideResponse>> handleRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long requestId,
            @RequestParam String action) {

        RideResponse response = driverService.handleRequest(
            userDetails.getUsername(), requestId, action);
        return ResponseEntity.ok(
            ApiResponse.success("Request " + action + "ED successfully",
                response));
    }

    // POST /api/driver/rides/{rideId}/complete
    @PostMapping("/rides/{rideId}/complete")
    public ResponseEntity<ApiResponse<RideResponse>> completeRide(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long rideId) {

        RideResponse response = driverService.completeRide(
            userDetails.getUsername(), rideId);
        return ResponseEntity.ok(
            ApiResponse.success("Ride completed successfully! 🎉", response));
    }

    // GET /api/driver/rides — view all my rides
    @GetMapping("/rides")
    public ResponseEntity<ApiResponse<List<RideResponse>>> getMyRides(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<RideResponse> rides = driverService.getMyRides(
            userDetails.getUsername());
        return ResponseEntity.ok(
            ApiResponse.success("Rides fetched", rides));
    }
}