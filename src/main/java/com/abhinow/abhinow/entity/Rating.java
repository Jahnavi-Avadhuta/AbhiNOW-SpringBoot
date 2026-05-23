package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ratingId;
	
	@OneToOne
	@JoinColumn(name = "ride_id", unique = true)
	private Ride ride;
	
	@ManyToOne
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;
	
	@ManyToOne
	@JoinColumn(name = "driver_id")
	private Driver driver;
	
	@Column(nullable = false)
	private int stars;
	
	private String comment;
	
	@Column(updatable = false)
	private LocalDateTime ratedAt;
	
	@PrePersist
	protected void onCreate() {
		ratedAt = LocalDateTime.now();
	}
	
}
