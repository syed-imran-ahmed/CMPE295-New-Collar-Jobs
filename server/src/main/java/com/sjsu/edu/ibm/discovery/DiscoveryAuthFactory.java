package com.sjsu.edu.ibm.discovery;

import com.ibm.watson.developer_cloud.discovery.v1.Discovery;

public class DiscoveryAuthFactory {
	private static final Object lock = new Object();
	private static volatile Discovery single_instance;
    public String s;
 
    private DiscoveryAuthFactory()
    {}
 
    public static Discovery getInstance()
    {
    	Discovery discovery = single_instance;
        if (discovery == null) {
            synchronized (lock) {    
            	discovery = single_instance;     
                if (discovery == null) {  
                	discovery = new Discovery("2017-10-16");
                    single_instance = discovery;
                    single_instance.setEndPoint("https://gateway.watsonplatform.net/discovery/api/");
                    single_instance.setUsernameAndPassword("025decac-dbe3-4c66-ba36-7048f10c8f2f", "iAPwXASlFgo4");
                } 
            } 
        } 
        return discovery;
    }
	
}
