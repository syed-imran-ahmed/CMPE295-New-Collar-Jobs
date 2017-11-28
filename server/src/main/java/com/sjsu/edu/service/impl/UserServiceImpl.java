package com.sjsu.edu.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.query.QueryResponse;
import com.sjsu.edu.ibm.discovery.DiscoveryAuthFactory;
import com.sjsu.edu.model.Job;
import com.sjsu.edu.model.User;
import com.sjsu.edu.model.UserProfile;
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
    private PasswordEncoder passwordEncoder;

	private static final String environmentId = "6d3d9103-19b2-46bf-ba67-3b9e9cab891b";
	private static final String collectionId = "7bbe91ad-c555-47ae-9f3d-a024e0a71ab6";

    public void resetCredentials() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.setPassword(passwordEncoder.encode("123"));
            userRepository.save(user);
        }
    }

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
	public List<Job> getJobRecommendations(String username, boolean cityFilter, boolean stateFilter) {
		UserProfile profile = profileRepository.findByUsername(username);
		
		QueryRequest.Builder queryBuilder = new QueryRequest.Builder(environmentId, collectionId);
		//If user wants a specific city, then apply both state and city filters on jobs.
		if(cityFilter){
			queryBuilder.filter("state::" + profile.getLocation().getState() + ", city::" + profile.getLocation().getCity());
		}
		else if(stateFilter){
			queryBuilder.filter("state::" + profile.getLocation().getState());
		}
		//Basic jobTitle match for now
		System.out.println("enriched_text.keywords.text:\"" + profile.getJobTitle() + "\" , enriched_text.entities.text:\"" + profile.getJobTitle() + "\"");
		queryBuilder.query("enriched_text.keywords.text:\"" + profile.getJobTitle() + "\" , enriched_text.entities.text:\"" + profile.getJobTitle() + "\"");
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		QueryResponse queryResponse = discovery.query(queryBuilder.build()).execute();
		
		List<Map<String, Object>> documents = queryResponse.getResults();
		List<Long> jobIds = new ArrayList<Long>();
		documents.forEach(document -> {
			List<String> keys = document.keySet()
                    .stream()
                    .filter(s -> s.endsWith("jobid"))
                    .collect(Collectors.toList());
			String jobId = String.valueOf(document.get(keys.get(0)));
			if(jobId.contains(".")){
				jobId = jobId.substring(0, jobId.indexOf("."));
			}
			jobIds.add(Long.parseLong(jobId));
		});
		
		return (List<Job>) jobRepository.findAll(jobIds);
	}
}
