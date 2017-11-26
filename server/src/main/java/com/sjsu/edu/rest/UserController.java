package com.sjsu.edu.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserProfile;
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

    @RequestMapping( method = RequestMethod.GET, value = "/user/{userId}" )
    public User loadById( @PathVariable Long userId ) {
    	String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    	User user = userService.findByUsername(currentUserName);
    	if (user!=null)
    	{
    		return this.userService.findById( userId );
    	}
    	else return null;
        
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
	try{
		profileRepository.save(profile);
		
	}catch(Exception e){
		return reportBadRequest(e);
	}
	return reportSuccess("Profile was created successfully.");
    }
    
    @RequestMapping( method = RequestMethod.GET, value= "/user/profile")
    public List<UserProfile> getProfile() {
    	List<UserProfile> profiles = profileRepository.findAll();
        return profiles;
    }
    
    @RequestMapping(method=RequestMethod.PATCH, value="/user/profile/{profileId}", consumes= MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<?> patchProfile(@PathVariable(name="profileId") String profileId, @RequestBody UserProfile partialProfile) {
    		final UserProfile userProfile = profileRepository.findOne(profileId);
    		
    		if(partialProfile.getBio()!=null) {
    			userProfile.setBio(partialProfile.getBio());
    		}
    		this.profileRepository.save(userProfile);
    		return reportSuccess("Profile patched successfully");
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
