package com.abhinow.abhinow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.DriverRoute;
import com.abhinow.abhinow.enums.RouteStatus;

@Repository
public interface DriverRouteRepository extends JpaRepository<DriverRoute, Long>{

	List<DriverRoute> findByDriverDriverIdAndIsActiveTrue(Long driverId);
	List<DriverRoute> findByRouteStatusAndIsActiveTrue(RouteStatus status);	
	
	@Query("SELECT dr FROM DriverRoute dr WHERE dr.isActive = true " +
	           "AND dr.routeStatus IN ('ACTIVE', 'IN_PROGRESS') " +
	           "AND dr.expiresAt > CURRENT_TIMESTAMP")
	List<DriverRoute> findAllActiveNonExpiredRoutes();
	
}
