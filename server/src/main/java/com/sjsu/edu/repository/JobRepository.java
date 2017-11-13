package com.sjsu.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}