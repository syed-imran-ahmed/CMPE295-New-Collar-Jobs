package com.sjsu.edu.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sjsu.edu.model.UserProfile;

public interface UserProfileRepository extends MongoRepository<UserProfile, Long> {
    UserProfile findByUsername(String username);

}