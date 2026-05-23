package com.abhinow.abhinow.service.impl;

import com.abhinow.abhinow.dto.request.LoginRequest;
import com.abhinow.abhinow.dto.request.RegisterRequest;
import com.abhinow.abhinow.dto.response.AuthResponse;
import com.abhinow.abhinow.entity.User;
import com.abhinow.abhinow.enums.Role;
import com.abhinow.abhinow.exception.BadRequestException;
import com.abhinow.abhinow.repository.UserRepository;
import com.abhinow.abhinow.security.JwtService;
import com.abhinow.abhinow.service.AuthService;
import com.abhinow.abhinow.service.OtpService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final OtpService otpService;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final UserDetailsService userDetailsService;

	@Override
	public AuthResponse register(RegisterRequest request) {

		// Check if email already exists
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new BadRequestException("Email already registered: " + request.getEmail());
		}

		// Check if phone already exists
		if (userRepository.existsByPhone(request.getPhone())) {
			throw new BadRequestException("Phone already registered: " + request.getPhone());
		}

		// Create new user
		User user = User.builder().name(request.getName()).email(request.getEmail()).phone(request.getPhone())
				// BCrypt hash the password
				.password(passwordEncoder.encode(request.getPassword())).role(Role.USER) // default role
				.isSuspended(false).trustScore(5.0).isGoogleUser(false).build();

		// Save to database
		userRepository.save(user);

		// Send OTP for phone verification
		otpService.sendOtp(request.getPhone());

		// Generate JWT token
		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		String token = jwtService.generateToken(userDetails);

		return AuthResponse.builder().token(token).name(user.getName()).email(user.getEmail())
				.role(user.getRole().name()).message("Registration successful! Welcome to AbhiNOW 🚗").build();
	}

	@Override
	public AuthResponse login(LoginRequest request) {

		// Spring Security checks email + password automatically
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		// If we reach here, credentials are correct
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new BadRequestException("User not found"));

		// Check if suspended
		if (user.isSuspended()) {
			throw new BadRequestException("Your account has been suspended. Contact support.");
		}

		// Generate JWT token
		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		String token = jwtService.generateToken(userDetails);

		return AuthResponse.builder().token(token).name(user.getName()).email(user.getEmail())
				.role(user.getRole().name()).message("Login successful! Saath chalein? Abhi? 🚗").build();
	}
}