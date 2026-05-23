package com.abhinow.abhinow.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "route_points")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutePoint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pointId;
	
	@ManyToOne
	@JoinColumn(name = "route_id")
	private DriverRoute route;
	
	@Column(nullable = false)
	private String locationName;
	
	@Column(nullable = false)
	private int sequenceNo;
}
