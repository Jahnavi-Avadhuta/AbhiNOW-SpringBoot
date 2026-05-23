package com.abhinow.abhinow.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RatingRequest {

	@NotNull(message = "Ride ID is required")
	private Long rideId;

	@NotNull(message = "Stars are required")
	@Min(value = 1, message = "Minimum 1 star")
	@Max(value = 5, message = "Maximum 5 stars")
	private Integer stars;

	private String comment;

}