package com.sjsu.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="application")
@Data
@NoArgsConstructor
public class Applications {
	@Id
	@Column(name = "appid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long appid;
	
	@Column(name = "userid")
	private long userid;
	
	@Column(name = "jobid")
	private long jobid;
}