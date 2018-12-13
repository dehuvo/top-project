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
	private String name;       // 부서 이름
	private int chief;         // 리더 id
	private String chiefName;  // 리더 이름
	private int upId;          // 상위 부서 id
	private String upName;     // 상위 부서 이름
	private List<Dept> sub;    // 하뤼 부서 목록 
}