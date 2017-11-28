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

	//String quotation;

    String username;
    String firstName;
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	String lastName;
    String emailId;
    String quotation;

    Integer age;
    String jobTitle;
    String imageURL;
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
	String city;
	String state;
	String country;
    }

    public enum FamilyStatus {
	SINGLE, MARRIED, MARRIED_WITH_KIDS, DIVORCED;
    }

    @Data
    public static class Personality {
	public Integer getIntrovertExtrovert() {
			return introvertExtrovert;
		}
		public void setIntrovertExtrovert(Integer introvertExtrovert) {
			this.introvertExtrovert = introvertExtrovert;
		}
		public Integer getThinkingFeeling() {
			return thinkingFeeling;
		}
		public void setThinkingFeeling(Integer thinkingFeeling) {
			this.thinkingFeeling = thinkingFeeling;
		}
		public Integer getSensingIntuition() {
			return sensingIntuition;
		}
		public void setSensingIntuition(Integer sensingIntuition) {
			this.sensingIntuition = sensingIntuition;
		}
		public Integer getJudgingPerceiving() {
			return judgingPerceiving;
		}
		public void setJudgingPerceiving(Integer judgingPerceiving) {
			this.judgingPerceiving = judgingPerceiving;
		}
	Integer introvertExtrovert;
	Integer thinkingFeeling;
	Integer sensingIntuition;
	Integer judgingPerceiving;
    }

    @Data
    public static class Motivation {
	public Integer getIncentive() {
			return incentive;
		}
		public void setIncentive(Integer incentive) {
			this.incentive = incentive;
		}
		public Integer getFear() {
			return fear;
		}
		public void setFear(Integer fear) {
			this.fear = fear;
		}
		public Integer getGrowth() {
			return growth;
		}
		public void setGrowth(Integer growth) {
			this.growth = growth;
		}
		public Integer getPower() {
			return power;
		}
		public void setPower(Integer power) {
			this.power = power;
		}
		public Integer getSocial() {
			return social;
		}
		public void setSocial(Integer social) {
			this.social = social;
		}
	Integer incentive;
	Integer fear;
	Integer growth;
	Integer power;
	Integer social;
    }
}