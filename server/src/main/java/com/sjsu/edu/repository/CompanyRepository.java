package com.sjsu.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.edu.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByCompanyName(String companyName);
}

