package com.sjsu.edu.service;

import com.sjsu.edu.model.Job;

public interface JobService {
    Job findById(Long jid);
    void saveJob(Job job);
    void deleteJob(Long jid);
}
