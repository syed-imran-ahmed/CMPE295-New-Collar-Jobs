package com.sjsu.edu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sjsu.edu.model.Job;
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
    Page<Job> getJobRecommendations(String username, boolean cityFilter, boolean stateFilter, Pageable pageable);
    List<Job> search(String searchString);
}
