package com.sjsu.edu.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserProfile;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.repository.UserProfileRepository;
import com.sjsu.edu.service.UserService;


/**
 * @author imran
 *
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserProfileRepository profileRepository;
    
    @Autowired
    private JobRepository jobRepository;

    @RequestMapping( method = RequestMethod.GET, value = "/user/{userId}" )
    public User loadById( @PathVariable Long userId ) {
    	String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    	return userService.findByUsername(currentUserName); 
    }

    @RequestMapping( method = RequestMethod.GET, value= "/user/all")
    public List<User> loadAll() {
    	String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    	User user = userService.findByUsername(currentUserName);
    	if (user!=null)
    	{
    		return this.userService.findAll();
    	}
    	else return null;
    }

    @RequestMapping( method = RequestMethod.GET, value= "/user/reset-credentials")
    public ResponseEntity<?> resetCredentials() {
        this.userService.resetCredentials();
        return reportSuccess("Password was reset successfully.");
    }
    /*
     *  We are not using userService.findByUsername here(we could),
     *  so it is good that we are making sure that the user has role "ROLE_USER"
     *  to access this endpoint.
     */
    @RequestMapping("/whoami")
    //@PreAuthorize("hasRole('USER')")
    public User user() {
        return (User)SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }
    
    @RequestMapping( method = RequestMethod.POST, value= "/user/profile", consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> createProfile( UserProfile profile) {
    
    String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userService.findByUsername("imran");
    
    if(user!=null){
	    profile.setEmailId(user.getEmailid());
	    profile.setFirstName(user.getFirstname());
	    profile.setLastName(user.getLastname());
	    profile.setUsername(user.getUsername());
    }
    UserProfile p;
	try{
		p = profileRepository.save(profile);
	}catch(Exception e){
		return reportBadRequest(e);
	}
	return ResponseEntity.accepted().body(p);
    }
    
    @RequestMapping( method = RequestMethod.GET, value= "/user/profile/")
    public UserProfile getProfile() {
        String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    	return profileRepository.findByUsername(currentUserName);
    }
    
    @RequestMapping( method = RequestMethod.GET, value= "/user/jobs")
    public Page<Job> getJobRecommendations( Pageable pageable, @RequestParam(value = "cityFilter", required = false) boolean cityFilter,
    		@RequestParam(value = "stateFilter", required = false) boolean stateFilter) {
        String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        if(currentUserName == null || currentUserName.isEmpty()){
        	currentUserName = "imran";
        }
        
//		Page<Job> page = new PageImpl<>(userService.getJobRecommendations(currentUserName, cityFilter, stateFilter));
//		return page;
        
        Page<Job> jobs = jobRepository.findAll(pageable);
    	return jobs;
        
    }
    

	private ResponseEntity<?> reportSuccess(String message) {
		Map<String, String> result = new HashMap<>();
        result.put( "result", message );
        return ResponseEntity.accepted().body(result);
	}

	private ResponseEntity<?> reportBadRequest(Exception e) {
		Map<String, String> result = new HashMap<>();
		result.put( "result",  e.getMessage());
		return ResponseEntity.badRequest().body(result);
	}

}
