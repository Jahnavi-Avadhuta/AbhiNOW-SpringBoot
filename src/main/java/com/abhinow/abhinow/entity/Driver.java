package com.abhinow.abhinow.entity;

import com.abhinow.abhinow.enums.VehicleType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long driverId;

	@OneToOne
	@JoinColumn(name = "user_id", unique = true)
	private User user;

	@Enumerated(EnumType.STRING)
	private VehicleType vehicleType;

	private String licenseNumber;

	@Column(nullable = false)
	private boolean isAvailable = true;
}
