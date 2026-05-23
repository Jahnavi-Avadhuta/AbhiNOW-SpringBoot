package com.abhinow.abhinow.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OtpRequest {

    @NotBlank(message = "Phone is required")
    private String phone;
}