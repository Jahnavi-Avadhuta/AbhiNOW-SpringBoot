package com.abhinow.abhinow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.RejectedRequest;

@Repository
public interface RejectedRequestRepository extends JpaRepository<RejectedRequest, Long> {

	boolean existsByPassengerPassengerIdAndRouteRouteId(Long passengerId, Long routeId);

}
