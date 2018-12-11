package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocAppr {	
	private String lev1Dept;
	private int lev1Chief;
	private String lev1Name;
	private String lev2Dept;
	private int lev2Chief;
	private String lev2Name;
	private String lev3Dept;
	private int lev3Chief;
	private String lev3Name;
}
