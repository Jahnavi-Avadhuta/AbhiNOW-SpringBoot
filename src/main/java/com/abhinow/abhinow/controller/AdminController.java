package com.abhinow.abhinow.controller;

import com.abhinow.abhinow.service.impl.UserServiceImpl;
import com.abhinow.abhinow.dto.response.*;
import com.abhinow.abhinow.entity.Location;
import com.abhinow.abhinow.enums.ComplaintStatus;
import com.abhinow.abhinow.repository.*;
import com.abhinow.abhinow.service.LocationService;
import com.abhinow.abhinow.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	private final UserRepository userRepository;
	private final RideRepository rideRepository;
	private final DriverRouteRepository routeRepository;
	private final ComplaintRepository complaintRepository;
	private final RatingRepository ratingRepository;
	private final LocationService locationService;
	private final UserServiceImpl userService;

	@GetMapping("/stats")
	public ResponseEntity<ApiResponse<AdminStatsResponse>> getStats() {
		AdminStatsResponse stats = AdminStatsResponse.builder().totalUsers(userRepository.count())
				.totalRides(rideRepository.count())
				.completedRides(rideRepository.findAll().stream()
						.filter(r -> r.getRideStatus().name().equals("COMPLETED")).count())
				.cancelledRides(rideRepository.findAll().stream()
						.filter(r -> r.getRideStatus().name().equals("CANCELLED")).count())
				.activeRoutes(routeRepository.findAll().stream().filter(r -> r.isActive()).count())
				.pendingComplaints(complaintRepository.countByStatus(ComplaintStatus.PENDING))
				.suspendedUsers(userRepository.findAll().stream().filter(u -> u.isSuspended()).count())
				.totalRevenue(rideRepository.findAll().stream().mapToDouble(r -> r.getCommissionAmount()).sum())
				.build();

		return ResponseEntity.ok(ApiResponse.success("Stats fetched", stats));
	}

	@GetMapping("/users")
	public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
		List<UserResponse> users = userRepository.findAll().stream().map(userService::mapToResponse)
				.collect(Collectors.toList());
		return ResponseEntity.ok(ApiResponse.success("Users fetched", users));
	}

	@PostMapping("/users/{userId}/suspend")
	public ResponseEntity<ApiResponse<Void>> suspendUser(@PathVariable Long userId) {
		userRepository.findById(userId).ifPresent(user -> {
			user.setSuspended(true);
			userRepository.save(user);
		});
		return ResponseEntity.ok(ApiResponse.success("User suspended", null));
	}

	@PostMapping("/users/{userId}/unsuspend")
	public ResponseEntity<ApiResponse<Void>> unsuspendUser(@PathVariable Long userId) {
		userRepository.findById(userId).ifPresent(user -> {
			user.setSuspended(false);
			userRepository.save(user);
		});
		return ResponseEntity.ok(ApiResponse.success("User unsuspended", null));
	}

	@DeleteMapping("/users/{userId}")
	public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long userId) {
		userRepository.deleteById(userId);
		return ResponseEntity.ok(ApiResponse.success("User deleted", null));
	}

	@DeleteMapping("/ratings/{ratingId}")
	public ResponseEntity<ApiResponse<Void>> deleteRating(@PathVariable Long ratingId) {
		ratingRepository.deleteById(ratingId);
		return ResponseEntity.ok(ApiResponse.success("Rating deleted", null));
	}

	@PostMapping("/locations")
	public ResponseEntity<ApiResponse<Location>> addLocation(@RequestParam String name, @RequestParam double lat,
			@RequestParam double lon) {
		Location location = locationService.addLocation(name, lat, lon);
		return ResponseEntity.ok(ApiResponse.success("Location added", location));
	}

	@DeleteMapping("/locations/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteLocation(@PathVariable Long id) {
		locationService.deleteLocation(id);
		return ResponseEntity.ok(ApiResponse.success("Location deleted", null));
	}
}