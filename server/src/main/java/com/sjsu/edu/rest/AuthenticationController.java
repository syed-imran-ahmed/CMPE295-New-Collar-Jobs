package com.sjsu.edu.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.Company;
import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserTokenState;
import com.sjsu.edu.repository.CompanyRepository;
import com.sjsu.edu.repository.UserRepository;
import com.sjsu.edu.security.TokenHelper;
import com.sjsu.edu.service.impl.CustomUserDetailsService;


/**
 * @author imran
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class AuthenticationController {

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    TokenHelper tokenHelper;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.expires_in}")
    private int EXPIRES_IN;

    @Value("${jwt.cookie}")
    private String TOKEN_COOKIE;

    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request, HttpServletResponse response) {

        String authToken = tokenHelper.getToken( request );
        if (authToken != null && tokenHelper.canTokenBeRefreshed(authToken)) {
            // TODO check user password last update
            String refreshedToken = tokenHelper.refreshToken(authToken);

            Cookie authCookie = new Cookie( TOKEN_COOKIE, ( refreshedToken ) );
            authCookie.setPath( "/" );
            authCookie.setHttpOnly( true );
            authCookie.setMaxAge( EXPIRES_IN );
            // Add cookie to response
            response.addCookie( authCookie );

            UserTokenState userTokenState = new UserTokenState(refreshedToken, EXPIRES_IN);
            return ResponseEntity.ok(userTokenState);
        } else {
            UserTokenState userTokenState = new UserTokenState();
           return ResponseEntity.accepted().body(userTokenState);
        }
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    //@PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> register(User newUser) {
    	Map<String, String> result = new HashMap<>();
    	User userWithUserName = userRepository.findByUsername(newUser.getUsername());
    	User userWithEmailid = userRepository.findByEmailid(newUser.getEmailid());
    	
    	if(userWithUserName == null && userWithEmailid == null)
    	{
    		newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    		userRepository.save(newUser);
    		if(newUser.getCompanyname()!=null)
    		{
    			Company newCompany = new Company();
    			newCompany.setCid(newUser.getId());
    			newCompany.setName(newUser.getCompanyname());
    			companyRepository.save(newCompany);
    		}
    		
    		result.put( "result", "success" );
    		return ResponseEntity.accepted().body(result);
    	}
    	else
    	{
    		result.put( "result", "Error" );
    		return ResponseEntity.badRequest().body(result);
    	}
    }

    static class PasswordChanger {
        public String oldPassword;
        public String newPassword;
    }

}
