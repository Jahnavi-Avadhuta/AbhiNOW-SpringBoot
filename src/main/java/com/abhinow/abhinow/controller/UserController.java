package com.abhinow.abhinow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhinow.abhinow.dto.request.SetRoleRequest;
import com.abhinow.abhinow.dto.response.ApiResponse;
import com.abhinow.abhinow.dto.response.UserResponse;
import com.abhinow.abhinow.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<ApiResponse<UserResponse>> getProfile(@AuthenticationPrincipal UserDetails userDetails){
		UserResponse response = userService.getProfile(userDetails.getUsername());
		return ResponseEntity.ok(ApiResponse.success("Profile fetched", response));
	}
	
	@PostMapping("/set-role")
	public ResponseEntity<ApiResponse<UserResponse>> setRole(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody SetRoleRequest request){
		UserResponse response = userService.setRole(userDetails.getUsername(), request);
		return ResponseEntity.ok(ApiResponse.success("Role updated successfully", response));
	}
	
}
