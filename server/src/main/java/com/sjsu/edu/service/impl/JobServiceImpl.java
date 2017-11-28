package com.sjsu.edu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.edu.ibm.discovery.DiscoveryService;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.service.JobService;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

	@Override
	public Job findById(Long id) {
		return jobRepository.findOne(id);
	}
	
	@Override
	public void saveJob(Job job){
		jobRepository.save(job);
		//send to discovery as well
		DiscoveryService.submitJob(job);
	}
	
	@Override
	public void deleteJob(Long id){
		jobRepository.delete(id);
	}

}
