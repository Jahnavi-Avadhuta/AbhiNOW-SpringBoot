package com.abhinow.abhinow.util;

import org.springframework.stereotype.Component;
import java.util.Random;

@Component
public class OtpUtil {

    // Generate a 6-digit OTP
    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}