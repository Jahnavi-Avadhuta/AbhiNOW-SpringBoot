package com.abhinow.abhinow.service.impl;

import org.springframework.stereotype.Service;

import com.abhinow.abhinow.dto.request.SetRoleRequest;
import com.abhinow.abhinow.dto.response.UserResponse;
import com.abhinow.abhinow.entity.Driver;
import com.abhinow.abhinow.entity.Passenger;
import com.abhinow.abhinow.entity.User;
import com.abhinow.abhinow.enums.Role;
import com.abhinow.abhinow.enums.VehicleType;
import com.abhinow.abhinow.exception.BadRequestException;
import com.abhinow.abhinow.exception.ResourceNotFoundException;
import com.abhinow.abhinow.repository.DriverRepository;
import com.abhinow.abhinow.repository.PassengerRepository;
import com.abhinow.abhinow.repository.UserRepository;
import com.abhinow.abhinow.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final DriverRepository driverRepository;
	private final PassengerRepository passengerRepository;
	
	@Override
	public UserResponse getProfile(String email) {
		User user = findUserByEmail(email);
		return mapToResponse(user);
	}
	
	@Override
	public UserResponse setRole(String email, SetRoleRequest request) {
		User user = findUserByEmail(email);
		if(request.getRole() == Role.DRIVER) {
			if(!driverRepository.existsByUserUserId(user.getUserId())) {
				if(request.getVehicleType() == null) {
					throw new BadRequestException("Vehicle type is required for driver role");
				}
				Driver driver = Driver.builder()
						.user(user)
						.vehicleType(VehicleType.valueOf(request.getVehicleType().toUpperCase()))
						.licenseNumber(request.getLicenseNumber())
						.isAvailable(true)
						.build();
				driverRepository.save(driver);
			}
		} else if (request.getRole() == Role.USER) {
			if(!passengerRepository.existsByUserUserId(user.getUserId())) {
				Passenger passenger = Passenger.builder()
						.user(user)
						.build();
				passengerRepository.save(passenger);
			}
		}
		user.setRole(request.getRole());
		userRepository.save(user);
		return mapToResponse(user);
	}
	
	@Override
	public UserResponse getUserByEmail(String email) {
		return mapToResponse(findUserByEmail(email));
	}
	
	private User findUserByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
	}
	
	public UserResponse mapToResponse(User user) {
		return UserResponse.builder()
				.userId(user.getUserId())
				.name(user.getName())
				.email(user.getEmail())
				.phone(user.getPhone())
				.role(user.getRole().name())
				.isSuspended(user.isSuspended())
				.trustScore(user.getTrustScore())
				.createdAt(user.getCreatedAt())
				.build();
	}
	
}
