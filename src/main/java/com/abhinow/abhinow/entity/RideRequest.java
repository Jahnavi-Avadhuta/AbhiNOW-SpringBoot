package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;

import com.abhinow.abhinow.enums.RequestStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ride_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RideRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long requestId;
	
	@ManyToOne
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;
	
	@ManyToOne
	@JoinColumn(name = "route_id")
	private DriverRoute route;
	
	private String pickupLocation;
	private String dropLocation;
	
	@Enumerated(EnumType.STRING)
	private RequestStatus requestStatus = RequestStatus.PENDING;
	
	@Column(updatable = false)
	private LocalDateTime requestedAt;
	
	private LocalDateTime handledAt;
	
	@PrePersist
	protected void onCreate() {
		requestedAt = LocalDateTime.now();
	}
}
