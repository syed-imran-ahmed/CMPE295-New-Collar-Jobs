package com.sjsu.edu.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryResponse;
import com.sjsu.edu.ibm.discovery.DiscoveryAuthFactory;
import com.sjsu.edu.model.Application;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserProfile;
import com.sjsu.edu.model.UserProfile.Trait;
import com.sjsu.edu.repository.ApplicationRepository;
import com.sjsu.edu.repository.JobRepository;
import com.sjsu.edu.repository.UserProfileRepository;
import com.sjsu.edu.repository.UserRepository;
import com.sjsu.edu.service.UserService;


/**
 * @author imran
 * 
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserProfileRepository profileRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private ApplicationRepository appRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

	private static final String environmentId = "502c7158-c198-4fe5-98f8-a4b80a5dd633";
	private static final String collectionId = "0d057ffb-35dd-4b19-8d36-8306c6774e96";

    public void resetCredentials() {
    	Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();
        User user =  userRepository.findByUsername(username);
        user.setPassword(passwordEncoder.encode("test"));
        userRepository.save(user);
    }
    
    private static final Integer THRESHOLD = 50;

    @Override
    //@PreAuthorize("hasRole('USER')")
    public User findByUsername( String username ) throws UsernameNotFoundException {
        User u = userRepository.findByUsername( username );
        return u;
    }

   // @PreAuthorize("hasRole('ADMIN')")
    public User findById( Long id ) throws AccessDeniedException {
        User u = userRepository.findOne( id );
        return u;
    }

    //@PreAuthorize("hasRole('ADMIN')")
    public List<User> findAll() throws AccessDeniedException {
        List<User> result = userRepository.findAll();
        return result;
    }

	@Override
	public User findByEmailid(String emailid) throws UsernameNotFoundException {
		User u = userRepository.findByEmailid( emailid );
        return u;
	}
	
	@Override
	public List<Application> getApplicationsForUser(String username){
		return appRepository.findByUsername(username);
	}
	
	@Override
	public Page<Job> getJobRecommendations(String username, boolean cityFilter, boolean stateFilter, Pageable pageable) {
		UserProfile profile = profileRepository.findByUsername(username);
		
		QueryRequest.Builder queryBuilder = new QueryRequest.Builder(environmentId, collectionId);
		//If user wants a specific city, then apply both state and city filters on jobs.
		if(cityFilter){
			queryBuilder.filter("state::" + profile.getLocation().getState() + ", city::" + profile.getLocation().getCity());
		}
		else if(stateFilter){
			queryBuilder.filter("state::" + profile.getLocation().getState());
		}
		
		queryBuilder.offset(pageable.getPageNumber() * pageable.getPageSize());
		queryBuilder.count(pageable.getPageSize());

		List<String> user_entity_types = getUserEntityTypes(profile);
		String user_entities_ORed = user_entity_types.stream().collect(Collectors.joining("\"%7C\""));
		
		System.out.println("enriched_text.entities.types:\"" + user_entities_ORed + "\" %7C enriched_title.concepts.text:\"" + profile.getJobTitle() + "\"");
		queryBuilder.query("title:\""+profile.getJobTitle()+ "\" %7C text:\""+profile.getJobTitle()+"\" %7C enriched_text.entities.types:\"" + user_entities_ORed + "\" %7C enriched_title.concepts.text:\"" + profile.getJobTitle() + "\"");
		//queryBuilder.query("title:\""+profile.getJobTitle()+ "\" %7C text:\""+profile.getJobTitle()+ "\" %7C enriched_title.concepts.text:\"" + profile.getJobTitle() + "\"");
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		QueryRequest request = queryBuilder.build();
		System.out.println(request.toString());
		QueryResponse queryResponse = discovery.query(request).execute();
		List<Map<String, Object>> documents = queryResponse.getResults();
		System.out.println("Number of docs returned = " + documents.size());
		List<Long> jobIds = new ArrayList<Long>();
		documents.forEach(document -> {
			String jobId = String.valueOf(document.get("jobid"));
			if(jobId.contains(".")){
				jobId = jobId.substring(0, jobId.indexOf("."));
			}
			jobIds.add(Long.parseLong(jobId));
		});
		
		return jobRepository.findByJobidIn(jobIds, pageable);
	}

	private List<String> getUserEntityTypes(UserProfile profile) {
		/*
		 * If user has a certain entity_type, we search jobs with those entity_types
		 */
		List<String> user_entity_types = new ArrayList<>();
		if(profile.getMotivation() != null){
			if(profile.getMotivation().getGrowth() > THRESHOLD){
				user_entity_types.add("GROWTH");
			}
			if(profile.getMotivation().getIncentive() > THRESHOLD){
				user_entity_types.add("INCENTIVE");
			}
			if(profile.getMotivation().getPower() > THRESHOLD){
				user_entity_types.add("POWER");
			}
		}
		if(profile.getPersonality() != null){
			if(profile.getPersonality().getIntrovertExtrovert() > THRESHOLD){
				user_entity_types.add("EXTROVERT");
			}else{
				user_entity_types.add("INTROVERT");
			}
			if(profile.getPersonality().getThinkingFeeling() > THRESHOLD){
				user_entity_types.add("FEELING");
			}else{
				user_entity_types.add("THINKING");
			}
			if(profile.getPersonality().getSensingIntuition() > THRESHOLD){
				user_entity_types.add("INTUITION");
			}else{
				user_entity_types.add("SENSING");
			}
			if(profile.getPersonality().getJudgingPerceiving() > THRESHOLD){
				user_entity_types.add("PERCEIVING");
			}else{
				user_entity_types.add("JUDGING");
			}
		}
		if(profile.getTrait() != null){
			if(profile.getTrait().equals(Trait.BOOK_SMART)){
				user_entity_types.add("BOOK_SMART");
			}else{
				user_entity_types.add("STREET_SMART");
			}
			
		}
		return user_entity_types;
	}
	
	
	@Override
	public List<Job> search(String queryString){
		QueryRequest.Builder queryBuilder = new QueryRequest.Builder(environmentId, collectionId);
		
		queryBuilder.query("text:\"" + queryString +"\" %7Ctitle:\""+queryString +"\"");
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		QueryResponse queryResponse = discovery.query(queryBuilder.build()).execute();
		
		List<Map<String, Object>> documents = queryResponse.getResults();
		List<Long> jobIds = new ArrayList<Long>();
		documents.forEach(document -> {
			String jobId = String.valueOf(document.get("jobid"));
			if(jobId.contains(".")){
				jobId = jobId.substring(0, jobId.indexOf("."));
			}
			jobIds.add(Long.parseLong(jobId));
		});
		
		Iterable<Job> myObjects = jobRepository.findAll(jobIds);
		List<Job> myObjectsList = IteratorUtils.toList(myObjects.iterator());
		return myObjectsList;
	}
}
