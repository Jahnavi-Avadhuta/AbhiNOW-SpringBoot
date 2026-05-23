package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.abhinow.abhinow.enums.RouteStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "driver_routes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverRoute {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long routeId;
	
	@ManyToOne
	@JoinColumn(name = "driver_id")
	private Driver driver;
	
	@Column(nullable = false)
	private String startLocation;;
	
	@Column(nullable = false)
	private String endLocation;
	
	private LocalTime startTime;
	private LocalTime estimatedEndTime;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RouteStatus routeStatus = RouteStatus.ACTIVE;
	
	@Column(nullable = false)
	private boolean isActive = true;
	
	private LocalDateTime expiresAt;
	
	private int rejectedCount = 0;
	
	@OneToMany(mappedBy = "route", cascade = CascadeType.ALL)
	private List<RoutePoint> routePoints;
	
	@Column(updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
		createdAt = LocalDateTime.now();
	}
}
