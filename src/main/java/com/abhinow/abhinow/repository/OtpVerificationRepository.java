package com.abhinow.abhinow.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.abhinow.abhinow.entity.OtpVerification;

@Repository
public interface OtpVerificationRepository
        extends JpaRepository<OtpVerification, Long> {

    // Find latest OTP for a phone number
    Optional<OtpVerification> findTopByPhoneOrderByCreatedAtDesc(
        String phone);

    // Delete all OTPs for a phone (cleanup after verify)
    void deleteByPhone(String phone);
}