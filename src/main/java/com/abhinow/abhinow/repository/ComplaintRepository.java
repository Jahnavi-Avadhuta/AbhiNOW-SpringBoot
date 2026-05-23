package com.abhinow.abhinow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinow.abhinow.entity.Complaint;
import com.abhinow.abhinow.enums.ComplaintStatus;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long>{

	List<Complaint> findByStatus(ComplaintStatus status);
	long countByStatus(ComplaintStatus status);
	
}
