package com.sjsu.edu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.sjsu.edu.model.Company;
import com.sjsu.edu.repository.CompanyRepository;
import com.sjsu.edu.service.CompanyService;

public class CompanyServiceImpl implements CompanyService {
	
	@Autowired
	private CompanyRepository companyRepository;

	@Override
	public Company findById(Long cid) {
		return companyRepository.findOne(cid);
	}

	@Override
	public Company findByCompanyName(String companyName) {
		return companyRepository.findByCompanyName(companyName);
	}

	@Override
	public void saveCompany(Company company) {
		companyRepository.save(company);
	}

	@Override
	public void deleteCompany(Long cid) {
		companyRepository.delete(cid);
	}

}
