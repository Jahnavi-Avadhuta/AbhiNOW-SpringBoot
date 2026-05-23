package com.abhinow.abhinow.dto.response;

import java.time.LocalDateTime;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

	private Long userId;
	private String name;
	private String email;
	private String phone;
	private String role;
	private boolean isSuspended;
	private double trustScore;
	private LocalDateTime createdAt;

}