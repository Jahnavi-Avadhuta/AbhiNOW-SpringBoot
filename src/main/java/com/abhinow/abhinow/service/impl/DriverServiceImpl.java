package com.abhinow.abhinow.service.impl;

import com.abhinow.abhinow.dto.request.PostRouteRequest;
import com.abhinow.abhinow.dto.response.RideResponse;
import com.abhinow.abhinow.dto.response.RouteResponse;
import com.abhinow.abhinow.entity.*;
import com.abhinow.abhinow.enums.RequestStatus;
import com.abhinow.abhinow.enums.RideStatus;
import com.abhinow.abhinow.enums.RouteStatus;
import com.abhinow.abhinow.exception.BadRequestException;
import com.abhinow.abhinow.exception.ResourceNotFoundException;
import com.abhinow.abhinow.exception.UnauthorizedException;
import com.abhinow.abhinow.repository.*;
import com.abhinow.abhinow.service.DriverService;
import com.abhinow.abhinow.util.DistanceCalculator;
import com.abhinow.abhinow.util.FareCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final DriverRouteRepository routeRepository;
    private final RoutePointRepository routePointRepository;
    private final RideRequestRepository rideRequestRepository;
    private final RideRepository rideRepository;
    private final RejectedRequestRepository rejectedRequestRepository;
    private final LocationRepository locationRepository;
    private final DistanceCalculator distanceCalculator;
    private final FareCalculator fareCalculator;

    @Override
    @Transactional
    public RouteResponse postRoute(String email, PostRouteRequest request) {

        User user = findUserByEmail(email);
        Driver driver = driverRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new BadRequestException(
                    "Driver profile not found. Please set role to DRIVER first."));

        LocalTime startTime = request.getStartTime();
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), startTime);

        if (startDateTime.isBefore(LocalDateTime.now())) {
            startDateTime = startDateTime.plusDays(1);
        }

        DriverRoute route = DriverRoute.builder()
                .driver(driver)
                .startLocation(request.getStartLocation())
                .endLocation(request.getEndLocation())
                .startTime(startTime)
                .routeStatus(RouteStatus.ACTIVE)
                .isActive(true)
                .build();

        route = routeRepository.save(route);

        List<String> allPoints = new ArrayList<>();
        allPoints.add(request.getStartLocation());
        if (request.getWaypoints() != null) {
            allPoints.addAll(request.getWaypoints());
        }
        allPoints.add(request.getEndLocation());

        int seq = 1;
        for (String point : allPoints) {
            RoutePoint rp = RoutePoint.builder()
                    .route(route)
                    .locationName(point)
                    .sequenceNo(seq++)
                    .build();
            routePointRepository.save(rp);
        }

        double totalDistance = calculateRouteDistance(allPoints);
        int durationMins = (int) Math.ceil((totalDistance / 20.0) * 60);
        LocalDateTime expiresAt = startDateTime.plusMinutes(durationMins + 15);

        route.setExpiresAt(expiresAt);
        route.setEstimatedEndTime(startDateTime
            .plusMinutes(durationMins).toLocalTime());
        routeRepository.save(route);

        return mapToRouteResponse(route, allPoints);
    }

    @Override
    public List<RideResponse> getPendingRequests(String email) {
        User user = findUserByEmail(email);
        Driver driver = driverRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new BadRequestException(
                    "Driver profile not found"));

        List<DriverRoute> routes = routeRepository
            .findByDriverDriverIdAndIsActiveTrue(driver.getDriverId());

        List<RideResponse> pendingRequests = new ArrayList<>();
        for (DriverRoute route : routes) {
            List<RideRequest> requests = rideRequestRepository
                .findByRouteRouteIdAndRequestStatus(
                    route.getRouteId(), RequestStatus.PENDING);
            for (RideRequest req : requests) {
                pendingRequests.add(mapRequestToRideResponse(req));
            }
        }
        return pendingRequests;
    }

    @Override
    @Transactional
    public RideResponse handleRequest(String email,
                                       Long requestId, String action) {
        User user = findUserByEmail(email);
        Driver driver = driverRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new BadRequestException(
                    "Driver profile not found"));

        RideRequest rideRequest = rideRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Ride request not found"));

        if (!rideRequest.getRoute().getDriver()
                .getDriverId().equals(driver.getDriverId())) {
            throw new UnauthorizedException(
                "This request does not belong to you");
        }

        if (!"PENDING".equals(rideRequest.getRequestStatus().name())) {
            throw new BadRequestException(
                "Request is no longer pending");
        }

        if ("ACCEPT".equalsIgnoreCase(action)) {
            rideRequest.setRequestStatus(RequestStatus.ACCEPTED);
            rideRequest.setHandledAt(LocalDateTime.now());
            rideRequestRepository.save(rideRequest);

            Location pickup = locationRepository
                .findByLocationName(rideRequest.getPickupLocation())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Pickup location not found"));
            Location drop = locationRepository
                .findByLocationName(rideRequest.getDropLocation())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Drop location not found"));

            double distance = distanceCalculator.calculateDistance(
                pickup.getLatitude(), pickup.getLongitude(),
                drop.getLatitude(), drop.getLongitude());

            double fare = fareCalculator.calculateFare(
                driver.getVehicleType().name(), distance);

            Ride ride = Ride.builder()
                    .request(rideRequest)
                    .totalFare(fare)
                    .commissionAmount(fareCalculator.calculateCommission(fare))
                    .driverEarnings(fareCalculator.calculateDriverEarnings(fare))
                    .rideStatus(RideStatus.STARTED)
                    .passengerDistanceKm(distance)
                    .estimatedDurationMin(
                        Math.max(5, (int) ((distance / 15.0) * 60)))
                    .build();

            ride = rideRepository.save(ride);
            return mapRideToResponse(ride);

        } else if ("REJECT".equalsIgnoreCase(action)) {
            rideRequest.setRequestStatus(RequestStatus.REJECTED);
            rideRequest.setHandledAt(LocalDateTime.now());
            rideRequestRepository.save(rideRequest);

            RejectedRequest rejected = RejectedRequest.builder()
                    .passenger(rideRequest.getPassenger())
                    .route(rideRequest.getRoute())
                    .build();
            rejectedRequestRepository.save(rejected);

            return mapRequestToRideResponse(rideRequest);
        } else {
            throw new BadRequestException(
                "Invalid action. Use ACCEPT or REJECT");
        }
    }

    @Override
    @Transactional
    public RideResponse completeRide(String email, Long rideId) {
        User user = findUserByEmail(email);
        Driver driver = driverRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new BadRequestException(
                    "Driver profile not found"));

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Ride not found"));

        if (!ride.getRequest().getRoute().getDriver()
                .getDriverId().equals(driver.getDriverId())) {
            throw new UnauthorizedException(
                "This ride does not belong to you");
        }

        if (!RideStatus.STARTED.equals(ride.getRideStatus())) {
            throw new BadRequestException("Ride is not in STARTED status");
        }

        ride.setRideStatus(RideStatus.COMPLETED);
        ride.setCompletedAt(LocalDateTime.now());
        rideRepository.save(ride);

        RideRequest request = ride.getRequest();
        request.setRequestStatus(RequestStatus.COMPLETED);
        rideRequestRepository.save(request);

        List<RideRequest> pending = rideRequestRepository
            .findByRouteRouteIdAndRequestStatus(
                request.getRoute().getRouteId(), RequestStatus.PENDING);
        if (pending.isEmpty()) {
            DriverRoute route = request.getRoute();
            route.setActive(false);
            route.setRouteStatus(RouteStatus.EXPIRED);
            routeRepository.save(route);
        }

        return mapRideToResponse(ride);
    }

    @Override
    public List<RideResponse> getMyRides(String email) {
        User user = findUserByEmail(email);
        Driver driver = driverRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new BadRequestException(
                    "Driver profile not found"));

        return rideRepository.findByDriverId(driver.getDriverId())
                .stream()
                .map(this::mapRideToResponse)
                .collect(Collectors.toList());
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "User not found: " + email));
    }

    private double calculateRouteDistance(List<String> points) {
        double total = 0;
        for (int i = 0; i < points.size() - 1; i++) {
            Location l1 = locationRepository
                .findByLocationName(points.get(i)).orElse(null);
            Location l2 = locationRepository
                .findByLocationName(points.get(i + 1)).orElse(null);
            if (l1 != null && l2 != null) {
                total += distanceCalculator.calculateDistance(
                    l1.getLatitude(), l1.getLongitude(),
                    l2.getLatitude(), l2.getLongitude());
            }
        }
        return total;
    }

    private RouteResponse mapToRouteResponse(DriverRoute route,
                                              List<String> points) {
        return RouteResponse.builder()
                .routeId(route.getRouteId())
                .driverName(route.getDriver().getUser().getName())
                .driverId(route.getDriver().getDriverId())
                .vehicleType(route.getDriver().getVehicleType().name())
                .startLocation(route.getStartLocation())
                .endLocation(route.getEndLocation())
                .startTime(route.getStartTime())
                .routeStatus(route.getRouteStatus().name())
                .expiresAt(route.getExpiresAt())
                .waypoints(points)
                .build();
    }

    private RideResponse mapRequestToRideResponse(RideRequest req) {
        return RideResponse.builder()
                .requestId(req.getRequestId())
                .passengerName(req.getPassenger().getUser().getName())
                .pickupLocation(req.getPickupLocation())
                .dropLocation(req.getDropLocation())
                .rideStatus(req.getRequestStatus().name())
                .build();
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