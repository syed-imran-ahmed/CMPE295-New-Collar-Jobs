package com.sjsu.edu.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.data.domain.Pageable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="job")
@Data
@NoArgsConstructor
public class Job {
    
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getTraits() {
        return traits;
    }

    public void setTraits(String traits) {
        this.traits = traits;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    
    public void setCompanyLogo(String link){
        this.companyLogo = link;
    }
    
    public String getCompanyLogo(){
        return this.companyLogo;
    }
    
    public Job(Long jobid, String title, String description, 
            String city, String state, String country, int salary, String traits, String companyLogo){
        this.jobid = jobid;
        this.title = title;
        this.description = description;
        this.city = city;
        this.state = state;
        this.country = country;
        this.salary = salary;
        this.traits = traits;
        this.companyLogo = companyLogo;
    }

    @Id
    @Column(name = "jobid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobid;
    
    @Column(name = "title")
    private String title;
    
    @Column(name = "description")
    private String description;
    
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
    
    @Transient
    private String companyLogo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_cid")
    private Company company;
    
    @OneToMany(orphanRemoval=true, mappedBy = "job", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Application> applications;

    @JsonIgnore
    public List<Application> getApplications(Pageable pageable) {
        return applications;
    }
}
