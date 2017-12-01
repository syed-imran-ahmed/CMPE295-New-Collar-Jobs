package com.sjsu.edu.ibm.discovery;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentResponse;
import com.ibm.watson.developer_cloud.http.HttpMediaType;
import com.sjsu.edu.model.Job;

public class DiscoveryService {

	private static final String environmentId = "502c7158-c198-4fe5-98f8-a4b80a5dd633";
	private static final String collectionId = "0d057ffb-35dd-4b19-8d36-8306c6774e96";
	
	public static void submitJob(Job job)
	{
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		String jobId = String.valueOf(job.getJobid());
		String documentJson =String.format("{\"jobId\":\"%s\", \"title\":\"%s\",\"text\":\"%s\",\"city\":\"%s\",\"state\":\"%s\",\"country\":\"%s\"}"
				,jobId, 
				job.getTitle(),
				/* Combine the below fields into 'text' because DiscoveryService analyzes 'text' field */
				job.getTitle() + job.getDescription() + job.getTraits(), 
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
	