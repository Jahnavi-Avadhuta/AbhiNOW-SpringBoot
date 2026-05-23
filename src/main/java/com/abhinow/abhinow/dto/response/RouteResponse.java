package com.abhinow.abhinow.dto.response;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {

	private Long routeId;
	private String driverName;
	private Long driverId;
	private String vehicleType;
	private String startLocation;
	private String endLocation;
	private LocalTime startTime;
	private String routeStatus;
	private LocalDateTime expiresAt;
	private List<String> waypoints;
	private double averageRating;
	private int totalRatings;
	private double estimatedFare;
	private double distanceKm;

}