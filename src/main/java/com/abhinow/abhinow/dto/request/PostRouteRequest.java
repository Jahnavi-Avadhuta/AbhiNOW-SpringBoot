package com.abhinow.abhinow.dto.request;

import java.time.LocalTime;
import java.util.List;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PostRouteRequest {

	@NotBlank(message = "Start location is required")
	private String startLocation;

	@NotBlank(message = "End location is required")
	private String endLocation;

	@NotNull(message = "Start time is required")
	private LocalTime startTime;

	private List<String> waypoints;
	private String vehicleType;
	private String licenseNumber;

}