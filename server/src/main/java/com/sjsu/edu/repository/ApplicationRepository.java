package com.sjsu.edu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sjsu.edu.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select application from Job j inner join j.applications application where j.jobid = :jobId")
    public Page<Application> findByJobId(Long jobId, Pageable pageable);
    
    //@Query("select job from Company c inner join c.jobs job where c = :company")


}

