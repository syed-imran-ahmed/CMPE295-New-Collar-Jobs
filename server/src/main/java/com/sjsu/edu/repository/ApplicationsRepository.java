package com.sjsu.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.model.Applications;

public interface ApplicationsRepository extends JpaRepository<Applications, Long> {

}

