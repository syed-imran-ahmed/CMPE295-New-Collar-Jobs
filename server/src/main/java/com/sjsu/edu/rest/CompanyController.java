package com.sjsu.edu.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.edu.service.UserService;

/**
 * @author imran
 *
 */

@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class CompanyController {

    @Autowired
    private UserService userService;

  
//    @RequestMapping("/whoami")
//    public User user() {
//        return (User)SecurityContextHolder
//                .getContext()
//                .getAuthentication()
//                .getPrincipal();
//    }

}
