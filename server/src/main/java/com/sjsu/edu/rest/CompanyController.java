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
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.model.User;
import com.sjsu.edu.service.UserService;


/**
 * @author imran
 *
 */

@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class CompanyController {

//    @Autowired
//    private UserService userService;
//
//    @RequestMapping( method = GET, value = "/user/{userId}" )
//    public User loadById( @PathVariable Long userId ) {
//        return this.userService.findById( userId );
//    }
//
//    @RequestMapping( method = GET, value= "/user/all")
//    public List<User> loadAll() {
//        return this.userService.findAll();
//    }
//
//    @RequestMapping( method = GET, value= "/user/reset-credentials")
//    public ResponseEntity<Map> resetCredentials() {
//        this.userService.resetCredentials();
//        Map<String, String> result = new HashMap<>();
//        result.put( "result", "success" );
//        return ResponseEntity.accepted().body(result);
//    }
// 
//    @RequestMapping("/whoami")
//    public User user() {
//        return (User)SecurityContextHolder
//                .getContext()
//                .getAuthentication()
//                .getPrincipal();
//    }

}
