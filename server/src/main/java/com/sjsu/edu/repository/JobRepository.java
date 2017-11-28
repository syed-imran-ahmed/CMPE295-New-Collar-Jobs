package com.sjsu.edu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.sjsu.edu.model.Company;
import com.sjsu.edu.model.Job;

public interface JobRepository extends PagingAndSortingRepository<Job, Long> {
	
	@Query("select job from Company c inner join c.jobs job where c = :company")
	public Page<Job> findBy(@Param("company") Company company, Pageable pageable);
}