package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
	private int id;
	private int deptId;
	private String name;
	private String code;
	private String pw;
	private String phone;
	private String email;
	private String deptName;
}