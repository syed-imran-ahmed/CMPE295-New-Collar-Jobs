package com.sjsu.edu.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfile {

    @Id
    public String id;
    public String getQuotation() {
		return quotation;
	}

	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public FamilyStatus getFamilyStatus() {
		return familyStatus;
	}

	public void setFamilyStatus(FamilyStatus familyStatus) {
		this.familyStatus = familyStatus;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Personality getPersonality() {
		return personality;
	}

	public void setPersonality(Personality personality) {
		this.personality = personality;
	}

	public Motivation getMotivation() {
		return motivation;
	}

	public void setMotivation(Motivation motivation) {
		this.motivation = motivation;
	}

	public List<String> getTraits() {
		return traits;
	}

	public void setTraits(List<String> traits) {
		this.traits = traits;
	}

	public List<String> getGoals() {
		return goals;
	}

	public void setGoals(List<String> goals) {
		this.goals = goals;
	}

	public List<String> getFrustrations() {
		return frustrations;
	}

	public void setFrustrations(List<String> frustrations) {
		this.frustrations = frustrations;
	}

	String quotation;
    Integer age;
    String jobTitle;
    FamilyStatus familyStatus;
    String bio;
    Location location;
    Personality personality;
    Motivation motivation;
    List<String> traits;
    List<String> goals;
    List<String> frustrations;

    @Data
    public static class Location {
	String city;
	String state;
	String country;
    }

    public enum FamilyStatus {
	SINGLE, MARRIED, MARRIED_WITH_KIDS, DIVORCED;
    }

    @Data
    public static class Personality {
	Integer introvertExtrovert;
	Integer thinkingFeeling;
	Integer sensingIntuition;
	Integer judgingPerceiving;
    }

    @Data
    public static class Motivation {
	Integer incentive;
	Integer fear;
	Integer growth;
	Integer power;
	Integer social;
    }
}