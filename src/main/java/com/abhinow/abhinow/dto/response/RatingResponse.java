package com.abhinow.abhinow.dto.response;

import java.time.LocalDateTime;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingResponse {

	private Long ratingId;
	private Long rideId;
	private String passengerName;
	private String driverName;
	private int stars;
	private String comment;
	private LocalDateTime ratedAt;

}