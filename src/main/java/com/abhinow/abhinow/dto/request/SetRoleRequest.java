package com.abhinow.abhinow.dto.request;

import com.abhinow.abhinow.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SetRoleRequest {

	@NotNull(message = "Role is required")
	private Role role;

	private String vehicleType;
	private String licenseNumber;

}