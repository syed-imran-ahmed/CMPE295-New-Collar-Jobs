package com.sjsu.edu.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name="company")
public class Company {
	@Id
	private long cid;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "website")
	private String website;
	
	@Column(name = "logo")
	private String logo;

	@Column(name = "address")
	private String address;
	
	@Column(name = "description")
	private String description;
	
	@OneToMany(orphanRemoval=true, mappedBy = "company", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	private List<Jobs> jobPosts;

	public List<Jobs> getJobPosts() {
		return jobPosts;
	}

	public void setJobPosts(List<Jobs> jobPosts) {
		this.jobPosts = jobPosts;
	}

	public long getCid() {
		return cid;
	}

	public void setCid(long cid) {
		this.cid = cid;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
