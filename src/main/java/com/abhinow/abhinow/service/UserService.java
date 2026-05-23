package com.abhinow.abhinow.service;

import com.abhinow.abhinow.dto.request.SetRoleRequest;
import com.abhinow.abhinow.dto.response.UserResponse;
import com.abhinow.abhinow.enums.Role;

public interface UserService {
	UserResponse getProfile(String email);
	UserResponse setRole(String email, SetRoleRequest request);
	UserResponse getUserByEmail(String email);
}
