package com.abhinow.abhinow.dto.response;

import java.time.LocalDateTime;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideResponse {

	private Long rideId;
	private Long requestId;
	private String driverName;
	private String passengerName;
	private String pickupLocation;
	private String dropLocation;
	private String vehicleType;
	private double totalFare;
	private double commissionAmount;
	private double driverEarnings;
	private String rideStatus;
	private double distanceKm;
	private int estimatedDurationMin;
	private LocalDateTime startedAt;
	private LocalDateTime completedAt;
	private boolean isRated;

}