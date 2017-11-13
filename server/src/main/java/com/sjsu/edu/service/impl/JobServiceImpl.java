package com.sjsu.edu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.sjsu.edu.model.Job;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.service.JobService;

public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

	@Override
	public Job findById(Long id) {
		return jobRepository.getOne(id);
	}
	
	@Override
	public void saveJob(Job job){
		jobRepository.save(job);
	}
	
	@Override
	public void deleteJob(Long id){
		jobRepository.delete(id);
	}

}
