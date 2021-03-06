package com.sjsu.edu.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Company;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.repository.CompanyRepository;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.service.CompanyService;
import com.sjsu.edu.service.UserService;

/**
 * @author imran
 * 
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class CompanyController {

	@Autowired
	private CompanyService companyService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private JobRepository jobRepository;
    
    @RequestMapping(method = RequestMethod.GET, value = "/company/{companyId}" )
    public Company loadById(@PathVariable Long companyId) {
    	return companyService.findById(companyId);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/company", consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE )
    public ResponseEntity<?> saveCompany( Company company) {
    	companyService.saveCompany(company);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }
    
    /*
     * List all jobs of the currently logged in employer
     */
    @RequestMapping(method = RequestMethod.GET, value = "/company-home" )
    Page<Job> list( Pageable pageable){
    	String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    	User currentUser = userService.findByUsername(currentUserName);
    	String companyName = currentUser.getCompanyname();
    	Company company = companyService.findByCompanyName(companyName);
    	Page<Job> jobs = jobRepository.findBy(company, pageable);
    	return jobs;
    }
    
    @RequestMapping(method = RequestMethod.DELETE, value = "/company/{companyId}")
    public ResponseEntity<?> deleteCompany(Long companyId) {
    	companyService.deleteCompany(companyId);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }
}
