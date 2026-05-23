package com.abhinow.abhinow.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {

	private long totalUsers;
	private long totalRides;
	private long completedRides;
	private long cancelledRides;
	private long activeRoutes;
	private long pendingComplaints;
	private long suspendedUsers;
	private double totalRevenue;

}