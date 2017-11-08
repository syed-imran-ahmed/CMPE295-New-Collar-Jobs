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

@Entity
@Table(name="jobs")
public class Jobs {
	
	@Id
	@Column(name = "jid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long jobid;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "descrip")
	private String descrip;

	@Column(name = "resp")
	private String resp;
	
	
	@Column(name = "loc")
	private String loc;
	
	@Column(name = "sal")
	private int sal;
	
	@Column(name = "jobposition")
	private String jobposition;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_cid")
    private Company company;
	
	public Long getJobid() {
		return jobid;
	}

	public void setJobid(Long jobid) {
		this.jobid = jobid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getResp() {
		return resp;
	}

	public void setResp(String resp) {
		this.resp = resp;
	}
	
	public String getJobposition() {
		return jobposition;
	}

	public void setJobposition(String jobposition) {
		this.jobposition = jobposition;
	}

	public String getLoc() {
		return loc;
	}

	public void setLoc(String loc) {
		this.loc = loc;
	}

	public int getSal() {
		return sal;
	}

	public void setSal(int sal) {
		this.sal = sal;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
		
	public String getDescrip() {
		return descrip;
	}

	public void setDescrip(String descrip) {
		this.descrip = descrip;
	}
	
	
}
