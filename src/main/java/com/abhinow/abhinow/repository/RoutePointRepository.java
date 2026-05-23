package com.abhinow.abhinow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.RoutePoint;

@Repository
public interface RoutePointRepository extends JpaRepository<RoutePoint, Long> {

	List<RoutePoint> findByRouteRouteIdOrderBySequenceNoAsc(Long routeId);
	
}
