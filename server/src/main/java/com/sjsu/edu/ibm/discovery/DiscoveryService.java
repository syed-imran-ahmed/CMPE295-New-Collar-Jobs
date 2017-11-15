package com.sjsu.edu.ibm.discovery;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentRequest;
import com.ibm.watson.developer_cloud.discovery.v1.model.document.CreateDocumentResponse;
import com.ibm.watson.developer_cloud.http.HttpMediaType;

public class DiscoveryService {

	private static final String environmentId = "6d3d9103-19b2-46bf-ba67-3b9e9cab891b";
	private static final String collectionId = "7bbe91ad-c555-47ae-9f3d-a024e0a71ab6";
	public static void submitJobData(int jobid, String title, String description, String city, String state, String country)
	{
		Discovery discovery = DiscoveryAuthFactory.getInstance();
		String jid = String.valueOf(jobid);
		String documentJson =String.format("{\"jobId\":\"%s\", \"title\":\"%s\",\"text\":\"%s\",\"city\":\"%s\",\"state\":\"%s\",\"country\":\"%s\"}",jid,title,description,city,state,country); 
		
		InputStream documentStream = new ByteArrayInputStream(documentJson.getBytes());
		CreateDocumentRequest.Builder builder = new CreateDocumentRequest.Builder(environmentId, collectionId);
		builder.file(documentStream, HttpMediaType.APPLICATION_JSON);
		CreateDocumentResponse createResponse = discovery.createDocument(builder.build()).execute();
	}

	public static void main(String[] args)
	{
		submitJobData(1,"software eng","software","san jose","CA","US");
	}
}
	