package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "rejected_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RejectedRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;
	
	@ManyToOne
	@JoinColumn(name = "route_id")
	private DriverRoute route;
	
	@Column(updatable = false)
	private LocalDateTime rejectedAt;
	
	@PrePersist
	protected void onCreate() {
		rejectedAt = LocalDateTime.now();
	}
}
