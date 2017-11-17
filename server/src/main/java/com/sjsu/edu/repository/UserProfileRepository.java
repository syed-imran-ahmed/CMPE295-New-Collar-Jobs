package com.sjsu.edu.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.sjsu.edu.model.UserProfile;

public interface UserProfileRepository extends MongoRepository<UserProfile, Long> {

    Page<UserProfile> findAll(Pageable pageable);

}