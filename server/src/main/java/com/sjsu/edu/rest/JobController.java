package com.sjsu.edu.rest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Job;
import com.sjsu.edu.service.JobService;

/**
 * @author imran
 * 
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class JobController {

    @Autowired
    private JobService jobService;

    @RequestMapping(method = GET, value = "/job/{jobId}" )
    public Job loadById( @PathVariable Long jobId ) {
    	return jobService.findById(jobId);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/job")
    public ResponseEntity<?> saveJob(@RequestBody Job job) {
    	jobService.saveJob(job);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }
    
    @RequestMapping(method = RequestMethod.DELETE, value = "/job/{jobId}")
    public ResponseEntity<?> deleteJob(Long jobId) {
    	jobService.deleteJob(jobId);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }   
}
