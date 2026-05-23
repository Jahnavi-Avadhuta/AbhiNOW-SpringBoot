package com.abhinow.abhinow.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.abhinow.abhinow.entity.RideRequest;
import com.abhinow.abhinow.enums.RequestStatus;

@Repository
public interface RideRequestRepository extends JpaRepository<RideRequest, Long> {

	List<RideRequest> findByRouteRouteIdAndRequestStatus(Long routeId, RequestStatus status);

	List<RideRequest> findByPassengerPassengerId(Long passengerId);

	boolean existsByPassengerPassengerIdAndRouteRouteId(Long passengerId, Long routeId);
	
}