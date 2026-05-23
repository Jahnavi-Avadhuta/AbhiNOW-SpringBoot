package com.abhinow.abhinow.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RideRequestDto {

	@NotNull(message = "Route ID is required")
	private Long routeId;

	@NotBlank(message = "Pickup location is required")
	private String pickupLocation;

	@NotBlank(message = "Drop location is required")
	private String dropLocation;

}