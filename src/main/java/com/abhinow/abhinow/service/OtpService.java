package com.abhinow.abhinow.service;

public interface OtpService {
    void sendOtp(String phone);
    boolean verifyOtp(String phone, String otp);
}