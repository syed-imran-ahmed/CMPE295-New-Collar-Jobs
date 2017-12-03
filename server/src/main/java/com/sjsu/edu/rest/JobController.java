package com.sjsu.edu.rest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Application;
import com.sjsu.edu.model.Company;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.repository.ApplicationRepository;
import com.sjsu.edu.repository.UserProfileRepository;
import com.sjsu.edu.service.CompanyService;
import com.sjsu.edu.service.JobService;
import com.sjsu.edu.service.UserService;

/**
 * @author imran
 * 
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class JobController {

    @Autowired
    private JobService jobService;
    
    @Autowired
    private CompanyService companyService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    ApplicationRepository appRepository;
    
    @Autowired
    UserProfileRepository profileRepository;


    @RequestMapping(method = GET, value = "/job/{jobId}" )
    public Job loadById( @PathVariable Long jobId ) {
        return jobService.findById(jobId);
    }
    
    @RequestMapping(method = GET, value = "/job/{jobId}/applications" )
    public List<Application> getApplicantionsForJob( @PathVariable Long jobId ) {
    	List<Application> apps = appRepository.findByJobId(jobId);
    	
    	for(Application app:apps)
    	{
    		app.setUserProfile(profileRepository.findByUsername(app.getUser().getUsername()));
    	}
    	
        return apps;
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/job", consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> saveJob(Job job) {
        String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.findByUsername(currentUserName);
        String companyName = currentUser.getCompanyname();
        Company company = companyService.findByCompanyName(companyName);
        
        job.setCompany(company);
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
