package com.sjsu.edu.rest;

import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
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
    	profileRepository.save(profile);
    	Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }
    
    @RequestMapping( method = RequestMethod.GET, value= "/user/profile")
    public List<UserProfile> getProfile() {
    	List<UserProfile> profiles = profileRepository.findAll();
        return profiles;
    }

}
