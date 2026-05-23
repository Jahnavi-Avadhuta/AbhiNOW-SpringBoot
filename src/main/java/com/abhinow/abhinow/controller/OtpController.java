package com.abhinow.abhinow.controller;

import com.abhinow.abhinow.dto.request.OtpRequest;
import com.abhinow.abhinow.dto.request.OtpVerifyRequest;
import com.abhinow.abhinow.dto.response.ApiResponse;
import com.abhinow.abhinow.service.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    // POST /api/otp/send
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Void>> sendOtp(
            @Valid @RequestBody OtpRequest request) {

        otpService.sendOtp(request.getPhone());
        return ResponseEntity.ok(
            ApiResponse.success(
                "OTP sent to " + request.getPhone() + " 📱", null));
    }

    // POST /api/otp/verify
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Boolean>> verifyOtp(
            @Valid @RequestBody OtpVerifyRequest request) {

        boolean verified = otpService.verifyOtp(
            request.getPhone(), request.getOtp());
        return ResponseEntity.ok(
            ApiResponse.success("Phone verified successfully! ✅",
                verified));
    }
}