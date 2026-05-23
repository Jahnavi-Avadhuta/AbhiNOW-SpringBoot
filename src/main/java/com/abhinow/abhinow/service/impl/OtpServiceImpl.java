package com.abhinow.abhinow.service.impl;

import com.abhinow.abhinow.config.TwilioConfig;
import com.abhinow.abhinow.entity.OtpVerification;
import com.abhinow.abhinow.exception.BadRequestException;
import com.abhinow.abhinow.repository.OtpVerificationRepository;
import com.abhinow.abhinow.service.OtpService;
import com.abhinow.abhinow.util.OtpUtil;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpVerificationRepository otpRepository;
    private final OtpUtil otpUtil;
    private final TwilioConfig twilioConfig;

    @Override
    @Transactional
    public void sendOtp(String phone) {

        // Format phone for India (+91)
        String formattedPhone = formatPhone(phone);

        // Generate OTP
        String otp = otpUtil.generateOtp();

        // Delete old OTPs for this phone
        otpRepository.deleteByPhone(formattedPhone);

        // Save new OTP
        OtpVerification otpVerification = OtpVerification.builder()
                .phone(formattedPhone)
                .otp(otp)
                .verified(false)
                .build();
        otpRepository.save(otpVerification);

        // Send SMS via Twilio
        Message.creator(
            new PhoneNumber(formattedPhone),
            new PhoneNumber(twilioConfig.getPhoneNumber()),
            "🚗 Your AbhiNOW verification code is: " + otp +
            "\nValid for 10 minutes. Do not share with anyone."
        ).create();

        System.out.println("✅ OTP sent to: " + formattedPhone);
    }

    @Override
    @Transactional
    public boolean verifyOtp(String phone, String otp) {

        String formattedPhone = formatPhone(phone);

        Optional<OtpVerification> latest = otpRepository
            .findTopByPhoneOrderByCreatedAtDesc(formattedPhone);

        if (latest.isEmpty()) {
            throw new BadRequestException(
                "No OTP found for this phone. Please request a new one.");
        }

        OtpVerification otpVerification = latest.get();

        // Check if expired
        if (LocalDateTime.now().isAfter(otpVerification.getExpiresAt())) {
            throw new BadRequestException(
                "OTP has expired. Please request a new one.");
        }

        // Check if already verified
        if (otpVerification.isVerified()) {
            throw new BadRequestException(
                "OTP already used. Please request a new one.");
        }

        // Check if OTP matches
        if (!otpVerification.getOtp().equals(otp)) {
            throw new BadRequestException(
                "Invalid OTP. Please try again.");
        }

        // Mark as verified
        otpVerification.setVerified(true);
        otpRepository.save(otpVerification);

        // Cleanup
        otpRepository.deleteByPhone(formattedPhone);

        return true;
    }

    // Format Indian phone numbers to E.164 format
    private String formatPhone(String phone) {
        phone = phone.trim().replaceAll("\\s+", "");
        if (phone.startsWith("+")) return phone;
        if (phone.startsWith("91") && phone.length() == 12)
            return "+" + phone;
        if (phone.length() == 10)
            return "+91" + phone;
        return phone;
    }
}