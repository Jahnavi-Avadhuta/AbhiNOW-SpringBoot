package com.abhinow.abhinow.dto.request;

import lombok.Data;

@Data
public class LocationUpdateRequest {
    private Long rideId;
    private double latitude;
    private double longitude;
    private String driverName;
}