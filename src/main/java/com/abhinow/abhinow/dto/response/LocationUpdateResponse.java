package com.abhinow.abhinow.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationUpdateResponse {
    private Long rideId;
    private double latitude;
    private double longitude;
    private String driverName;
    private String timestamp;
}