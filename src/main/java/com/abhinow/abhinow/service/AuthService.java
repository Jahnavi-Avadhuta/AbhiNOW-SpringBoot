package com.abhinow.abhinow.service;

import com.abhinow.abhinow.dto.request.LoginRequest;
import com.abhinow.abhinow.dto.request.RegisterRequest;
import com.abhinow.abhinow.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}