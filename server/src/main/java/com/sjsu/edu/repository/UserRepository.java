package com.sjsu.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmailid(String emailid);
}

