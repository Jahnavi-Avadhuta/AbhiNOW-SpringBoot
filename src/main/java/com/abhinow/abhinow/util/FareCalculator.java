package com.abhinow.abhinow.util;

import java.time.LocalTime;

import org.springframework.stereotype.Component;

@Component
public class FareCalculator {

	private static final double BIKE_BASE = 10.0;
	private static final double AUTO_BASE = 15.0;
	private static final double CAR_BASE = 20.0;
	
	private static final double BIKE_PER_KM = 5.0;
	private static final double AUTO_PER_KM = 8.0;
	private static final double CAR_PER_KM = 12.0;
	
	private static final double SURGE_MULTIPLIER = 1.5;
	
	public double calculateFare(String vehicleType, double distanceKm) {
		double baseFare;
		double perKmRate;
		
		switch(vehicleType.toUpperCase()) {
		case "BIKE" -> { baseFare = BIKE_BASE; perKmRate = BIKE_PER_KM;}
		case "AUTO" -> { baseFare = AUTO_BASE; perKmRate = AUTO_PER_KM;}
		default     -> { baseFare = CAR_BASE; perKmRate = CAR_PER_KM;}
		}
		
		double fare = baseFare + (perKmRate * distanceKm);
		
		if(isSurgeTime()) {
			fare *= SURGE_MULTIPLIER;
		}
		
		return Math.round(fare * 100.0) / 100.0;
	}

	private boolean isSurgeTime() {
		LocalTime now = LocalTime.now();
		LocalTime morningStart = LocalTime.of(8, 0);
		LocalTime morningEnd = LocalTime.of(10, 0);
		LocalTime eveningStart = LocalTime.of(17, 0);
		LocalTime eveningEnd = LocalTime.of(20, 0);
		return (now.isAfter(morningStart) && now.isBefore(morningEnd)) || (now.isAfter(eveningStart) && now.isBefore(eveningEnd));
	}
	
	public double calculateCommission(double totalFare) {
		return Math.round(totalFare * 0.10 * 100.0) / 100.0;
	}
	
	public double calculateDriverEarnings(double totalFare) {
		return Math.round(totalFare * 0.90 * 100.0) / 100.0;
	}
	
}
