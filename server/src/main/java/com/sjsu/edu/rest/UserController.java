package com.sjsu.edu.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Applications;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserProfile;
import com.sjsu.edu.repository.ApplicationsRepository;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.repository.UserProfileRepository;
import com.sjsu.edu.repository.UserRepository;
import com.sjsu.edu.service.UserService;

/**
 * @author imran
 *
 */
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	
	@Autowired
	ApplicationsRepository appRepository;
	
	@Autowired
	UserRepository userRepository;

	@RequestMapping(method = RequestMethod.PATCH, value = "/user/profile/{profileId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> patchProfile(@PathVariable(name = "profileId") String profileId,
			@RequestBody UserProfile partialProfile) {
		String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
		final UserProfile userProfile = profileRepository.findByUsername(currentUserName);

		if (partialProfile.getBio() != null) {
			userProfile.setBio(partialProfile.getBio());
		}
		if(partialProfile.getFrustrations()!=null) {
			userProfile.setFrustrations(partialProfile.getFrustrations());
		}
		if(partialProfile.getGoals()!=null) {
			userProfile.setFrustrations(partialProfile.getGoals());
		}
		if(partialProfile.getImageURL()!=null) {
			userProfile.setImageURL(partialProfile.getImageURL());
		}
		if(partialProfile.getQuotation()!=null) {
			userProfile.setQuotation(partialProfile.getQuotation());
		}
		if(partialProfile.getPersonality()!=null) {
			userProfile.setPersonality(partialProfile.getPersonality());
		}
		
		this.profileRepository.save(userProfile);
		return reportSuccess("Profile patched successfully");
	}

	@RequestMapping(method = RequestMethod.GET, value = "/user/jobs/")
	public List<Job> getJobRecommendations(@RequestParam(value = "cityFilter", required = false) boolean cityFilter,
			@RequestParam(value = "stateFilter", required = false) boolean stateFilter) {
		String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
		if (currentUserName == null || currentUserName.isEmpty()) {
			currentUserName = "imran";
		}
		return userService.getJobRecommendations(currentUserName, cityFilter, stateFilter);
	}

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
    User user = userService.findByUsername(currentUserName);
    
    if(user!=null){
	    profile.setEmailId(user.getEmailid());
	    profile.setFirstName(user.getFirstname());
	    profile.setLastName(user.getLastname());
	    profile.setUsername(user.getUsername());
    }
    UserProfile p;
	try{
		user.setProfileComplete(true);
		userRepository.save(user);
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
    public Page<Job> getJobRecommendations( Pageable pageable,
    		@RequestParam(value = "cityFilter", required = false) boolean cityFilter,
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
    
    @RequestMapping( method = RequestMethod.GET, value= "/search/jobs")
    public Page<Job> search( Pageable pageable,
    		@RequestParam(value = "search") String search) {
        String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        if(currentUserName == null || currentUserName.isEmpty()){
        	currentUserName = "imran";
        }  
        
//        Page<Job> jobs = jobRepository.findAll(pageable);
//    	return jobs;
        Page<Job> page = new PageImpl<>(userService.search(search));
		return page;   
    }
    
    @RequestMapping( method = RequestMethod.POST, value= "/apply",consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> apply( Applications app) {
        String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        if(currentUserName == null || currentUserName.isEmpty()){
        	currentUserName = "imran";
        }  
        User user = userService.findByUsername(currentUserName);
        app.setUserid(user.getId());
        Applications application = appRepository.save(app);
    	return ResponseEntity.accepted().body(application);  
    }
    

	private ResponseEntity<?> reportSuccess(String message) {
		Map<String, String> result = new HashMap<>();
		result.put("result", message);
		return ResponseEntity.accepted().body(result);
	}

	private ResponseEntity<?> reportBadRequest(Exception e) {
		Map<String, String> result = new HashMap<>();
		result.put("result", e.getMessage());
		return ResponseEntity.badRequest().body(result);
	}

}
