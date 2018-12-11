package com.example.demo.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dept {
	private int id;
	private String name;
	private int chief;
	private String chiefName;
	private int upId;
	private String upName;
	private List<Dept> sub;
}