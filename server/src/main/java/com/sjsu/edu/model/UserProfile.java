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
    String username;
    String firstName;
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