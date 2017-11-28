package com.sjsu.edu.ibm.discovery;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentResponse;
import com.ibm.watson.developer_cloud.http.HttpMediaType;
import com.sjsu.edu.model.Job;

public class DiscoveryService {

	private static final String environmentId = "6d3d9103-19b2-46bf-ba67-3b9e9cab891b";
	private static final String collectionId = "7bbe91ad-c555-47ae-9f3d-a024e0a71ab6";
	
	public static void submitJob(Job job)
	{
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		String jobId = String.valueOf(job.getJobid());
		String documentJson =String.format("{\"jobId\":\"%s\", \"title\":\"%s\",\"text\":\"%s\",\"city\":\"%s\",\"state\":\"%s\",\"country\":\"%s\"}"
				,jobId, 
				job.getTitle(),
				/* Combine the below fields into 'text' because DiscoveryService analyzes 'text' field */
				job.getTitle() + job.getDescription() + job.getResponsibility() + job.getTraits(), 
				job.getCity(), job.getState(), job.getCountry());
		
		InputStream documentStream = new ByteArrayInputStream(documentJson.getBytes());
		CreateDocumentRequest.Builder builder = new CreateDocumentRequest.Builder(environmentId, collectionId);
		builder.file(documentStream, HttpMediaType.APPLICATION_JSON);
		CreateDocumentResponse createResponse = discovery.createDocument(builder.build()).execute();
	}

//	public static void main(String[] args)
//	{
//		Job job = Job.builder()
//				.title("Software Engineer")
//				.description("Software engineering")
//				.traits("Book smart")
//				.city("San Jose")
//				.state("CA")
//				.country("US")
//				.build();
//
//		submitJob(job);
//	}

}
	