package com.sjsu.edu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.edu.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select application from Job j inner join j.applications application where j.jobid = :jobId")
    public List<Application> findByJobId(@Param("jobId") Long jobId);
}

