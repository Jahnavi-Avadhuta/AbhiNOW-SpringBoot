package com.abhinow.abhinow.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SearchRideRequest {

	@NotBlank(message = "From location is required")
	private String fromLocation;

	@NotBlank(message = "To location is required")
	private String toLocation;

}