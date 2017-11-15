package com.sjsu.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.model.Company;

/**
 * @author imran
 *
 */
public interface CompanyRepository extends JpaRepository<Company, Long> {
//    Company findByUsername( String username );
//    Company findByEmailid(String emailid);
    
}

