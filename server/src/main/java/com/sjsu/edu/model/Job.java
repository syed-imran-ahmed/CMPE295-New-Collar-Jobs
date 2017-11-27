package com.sjsu.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="job")
@Data
@NoArgsConstructor
public class Job {
	
	@Id
	@Column(name = "jid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long jobid;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;

	@Column(name = "responsibility")
	private String responsibility;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "state")
	private String state;
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "salary")
	private int salary;
	
	@Column(name = "traits")
	private String traits;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_cid")
    private Company company;
}
