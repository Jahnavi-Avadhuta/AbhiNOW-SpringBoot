package com.abhinow.abhinow.entity;

import java.time.LocalDateTime;

import com.abhinow.abhinow.enums.ComplaintCategory;
import com.abhinow.abhinow.enums.ComplaintStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long complaintId;
	
	@ManyToOne
	@JoinColumn(name = "reporter_id")
	private User reporter;
	
	@ManyToOne
	@JoinColumn(name = " reported_id")
	private User reported;
	
	@Enumerated(EnumType.STRING)
	private ComplaintCategory category;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	@Enumerated(EnumType.STRING)
	private ComplaintStatus status = ComplaintStatus.PENDING;
	
	@Column(updatable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	protected void onCreate() {
		createdAt = LocalDateTime.now();
	}
	
}
