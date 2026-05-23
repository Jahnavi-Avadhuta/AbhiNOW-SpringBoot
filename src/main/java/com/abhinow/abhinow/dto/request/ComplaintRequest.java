package com.abhinow.abhinow.dto.request;

import com.abhinow.abhinow.enums.ComplaintCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ComplaintRequest {

	@NotNull(message = "Reported user ID is required")
	private Long reportedUserId;

	@NotNull(message = "Category is required")
	private ComplaintCategory category;

	@NotBlank(message = "Description is required")
	@Size(min = 10, message = "Description must be at least 10 characters")
	private String description;

}