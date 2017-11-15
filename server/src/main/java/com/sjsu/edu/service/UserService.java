package com.sjsu.edu.service;

import java.util.List;

import com.sjsu.edu.model.User;

/**
 * @author imran
 *
 */
public interface UserService {
    void resetCredentials();
    User findById(Long id);
    User findByUsername(String username);
    User findByEmailid(String emailid);
    List<User> findAll ();
}
