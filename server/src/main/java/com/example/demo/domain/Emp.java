package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
	private int id;
	private String name;      // 이름
	private int deptId;       // 소속부서 id
	private String deptName;  // 소속부서 이름
	private String code;      // 별명
	private String pw;        // 비밀번호
	private String phone;     // 전화번호
	private String email;     // 이메일 주소
}