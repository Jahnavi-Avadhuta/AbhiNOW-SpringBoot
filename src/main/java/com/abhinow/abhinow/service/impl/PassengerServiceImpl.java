package com.abhinow.abhinow.service.impl;

import com.abhinow.abhinow.dto.request.RatingRequest;
import com.abhinow.abhinow.dto.request.RideRequestDto;
import com.abhinow.abhinow.dto.request.SearchRideRequest;
import com.abhinow.abhinow.dto.response.RatingResponse;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;
import com.abhinow.abhinow.entity.*;
import com.abhinow.abhinow.enums.RequestStatus;
import com.abhinow.abhinow.enums.RideStatus;
import com.abhinow.abhinow.enums.RouteStatus;
import com.abhinow.abhinow.exception.BadRequestException;
import com.abhinow.abhinow.exception.ResourceNotFoundException;
import com.abhinow.abhinow.repository.*;
import com.abhinow.abhinow.service.PassengerService;
import com.abhinow.abhinow.util.DistanceCalculator;
import com.abhinow.abhinow.util.FareCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PassengerServiceImpl implements PassengerService {

    private final UserRepository userRepository;
    private final PassengerRepository passengerRepository;
    private final DriverRouteRepository routeRepository;
    private final RoutePointRepository routePointRepository;
    private final RideRequestRepository rideRequestRepository;
    private final RideRepository rideRepository;
    private final RatingRepository ratingRepository;
    private final RejectedRequestRepository rejectedRequestRepository;
    private final LocationRepository locationRepository;
    private final DistanceCalculator distanceCalculator;
    private final FareCalculator fareCalculator;

    @Override
    public List<RouteResponse> searchRides(SearchRideRequest request) {

        List<DriverRoute> activeRoutes =
            routeRepository.findAllActiveNonExpiredRoutes();

        List<RouteResponse> results = new ArrayList<>();

        Location fromLoc = locationRepository
            .findByLocationName(request.getFromLocation())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Location not found: " + request.getFromLocation()));

        Location toLoc = locationRepository
            .findByLocationName(request.getToLocation())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Location not found: " + request.getToLocation()));

        double distance = distanceCalculator.calculateDistance(
            fromLoc.getLatitude(), fromLoc.getLongitude(),
            toLoc.getLatitude(), toLoc.getLongitude());

        for (DriverRoute route : activeRoutes) {
            double fare = fareCalculator.calculateFare(
                route.getDriver().getVehicleType().name(), distance);

            Double avgRating = ratingRepository
                .findAverageRatingByDriverId(
                    route.getDriver().getDriverId());

            List<RoutePoint> points = routePointRepository
                .findByRouteRouteIdOrderBySequenceNoAsc(route.getRouteId());
            List<String> waypoints = points.stream()
                .map(RoutePoint::getLocationName)
                .collect(Collectors.toList());

            int totalRatings = ratingRepository
                .findByDriverDriverId(route.getDriver().getDriverId())
                .size();

            results.add(RouteResponse.builder()
                    .routeId(route.getRouteId())
                    .driverName(route.getDriver().getUser().getName())
                    .driverId(route.getDriver().getDriverId())
                    .vehicleType(route.getDriver().getVehicleType().name())
                    .startLocation(route.getStartLocation())
                    .endLocation(route.getEndLocation())
                    .startTime(route.getStartTime())
                    .routeStatus(route.getRouteStatus().name())
                    .expiresAt(route.getExpiresAt())
                    .waypoints(waypoints)
                    .averageRating(avgRating != null ? avgRating : 0.0)
                    .totalRatings(totalRatings)
                    .estimatedFare(fare)
                    .distanceKm(distance)
                    .build());
        }

        return results;
    }

    @Override
    @Transactional
    public RideResponse bookRide(String email, RideRequestDto request) {
        User user = findUserByEmail(email);
        Passenger passenger = passengerRepository
            .findByUserUserId(user.getUserId())
            .orElseThrow(() -> new BadRequestException(
                "Passenger profile not found"));

        DriverRoute route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Route not found"));

        if (!route.isActive() ||
            route.getRouteStatus() == RouteStatus.EXPIRED) {
            throw new BadRequestException("This route is no longer active");
        }

        if (rideRequestRepository.existsByPassengerPassengerIdAndRouteRouteId(
                passenger.getPassengerId(), route.getRouteId())) {
            throw new BadRequestException(
                "You have already requested this route");
        }

        if (rejectedRequestRepository
                .existsByPassengerPassengerIdAndRouteRouteId(
                    passenger.getPassengerId(), route.getRouteId())) {
            throw new BadRequestException(
                "You were rejected for this route");
        }

        RideRequest rideRequest = RideRequest.builder()
                .passenger(passenger)
                .route(route)
                .pickupLocation(request.getPickupLocation())
                .dropLocation(request.getDropLocation())
                .requestStatus(RequestStatus.PENDING)
                .build();

        rideRequest = rideRequestRepository.save(rideRequest);

        return RideResponse.builder()
                .requestId(rideRequest.getRequestId())
                .driverName(route.getDriver().getUser().getName())
                .pickupLocation(rideRequest.getPickupLocation())
                .dropLocation(rideRequest.getDropLocation())
                .rideStatus(rideRequest.getRequestStatus().name())
                .build();
    }

    @Override
    public List<RideResponse> getMyRides(String email) {
        User user = findUserByEmail(email);
        Passenger passenger = passengerRepository
            .findByUserUserId(user.getUserId())
            .orElseThrow(() -> new BadRequestException(
                "Passenger profile not found"));

        return rideRepository.findByPassengerId(passenger.getPassengerId())
                .stream()
                .map(ride -> {
                    boolean isRated = ratingRepository
                        .existsByRideRideId(ride.getRideId());
                    RideResponse response = mapRideToResponse(ride);
                    response.setRated(isRated);
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<RideResponse> getOngoingRides(String email) {
        User user = findUserByEmail(email);
        Passenger passenger = passengerRepository
            .findByUserUserId(user.getUserId())
            .orElseThrow(() -> new BadRequestException(
                "Passenger profile not found"));

        return rideRepository.findByPassengerId(passenger.getPassengerId())
                .stream()
                .filter(r -> r.getRideStatus() == RideStatus.STARTED)
                .map(this::mapRideToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RatingResponse rateRide(String email, RatingRequest request) {
        User user = findUserByEmail(email);
        Passenger passenger = passengerRepository
            .findByUserUserId(user.getUserId())
            .orElseThrow(() -> new BadRequestException(
                "Passenger profile not found"));

        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Ride not found"));

        if (ratingRepository.existsByRideRideId(ride.getRideId())) {
            throw new BadRequestException("You have already rated this ride");
        }

        if (ride.getRideStatus() != RideStatus.COMPLETED) {
            throw new BadRequestException("Can only rate completed rides");
        }

        Driver driver = ride.getRequest().getRoute().getDriver();

        Rating rating = Rating.builder()
                .ride(ride)
                .passenger(passenger)
                .driver(driver)
                .stars(request.getStars())
                .comment(request.getComment())
                .build();

        rating = ratingRepository.save(rating);

        return RatingResponse.builder()
                .ratingId(rating.getRatingId())
                .rideId(ride.getRideId())
                .passengerName(user.getName())
                .driverName(driver.getUser().getName())
                .stars(rating.getStars())
                .comment(rating.getComment())
                .ratedAt(rating.getRatedAt())
                .build();
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "User not found: " + email));
    }

    private RideResponse mapRideToResponse(Ride ride) {
        RideRequest req = ride.getRequest();
        return RideResponse.builder()
                .rideId(ride.getRideId())
                .requestId(req.getRequestId())
                .driverName(req.getRoute().getDriver().getUser().getName())
                .passengerName(req.getPassenger().getUser().getName())
                .pickupLocation(req.getPickupLocation())
                .dropLocation(req.getDropLocation())
                .vehicleType(req.getRoute().getDriver()
                    .getVehicleType().name())
                .totalFare(ride.getTotalFare())
                .commissionAmount(ride.getCommissionAmount())
                .driverEarnings(ride.getDriverEarnings())
                .rideStatus(ride.getRideStatus().name())
                .distanceKm(ride.getPassengerDistanceKm())
                .estimatedDurationMin(ride.getEstimatedDurationMin())
                .startedAt(ride.getStartedAt())
                .completedAt(ride.getCompletedAt())
                .build();
    }
}