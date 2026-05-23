package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;

import com.abhinow.abhinow.enums.RideStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rides")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ride {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long rideId;

	@OneToOne
	@JoinColumn(name = "request_id", unique = true)
	private RideRequest request;

	@Enumerated(EnumType.STRING)
	private RideStatus rideStatus = RideStatus.STARTED;

	@Column(nullable = false)
	private double passengerDistanceKm;

	@Column(nullable = false)
	private int estimatedDurationMin;

	private Integer etaToPickupMin;
	private Integer etaToDropMin;

	private double totalFare;
	private double commissionAmount;
	private double driverEarnings;

	@Column(updatable = false)
	private LocalDateTime startedAt;

	private LocalDateTime completedAt;

	@Column(updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
		startedAt = LocalDateTime.now();
		createdAt = LocalDateTime.now();
	}
}
