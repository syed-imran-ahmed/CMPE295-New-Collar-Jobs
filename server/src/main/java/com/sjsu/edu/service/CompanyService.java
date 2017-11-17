package com.sjsu.edu.service;

import com.sjsu.edu.model.Company;

public interface CompanyService {
    Company findById(Long cid);
    Company findByCompanyName(String companyName);
    void saveCompany(Company job);
    void deleteCompany(Long cid);
}
