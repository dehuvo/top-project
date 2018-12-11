package com.example.demo.domain;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doc {
	private int id;
	private String title;              // 제목
	private String body;               // 본문
	private boolean publish;           // 공지 여부
	private int author;                // 기안자 id
	private String name;               // 기안자 이름
	private String dept;               // 기안자 부서 이름
	private List<Approval> approvals;  // 결재선
	private String stat;               // 상태
	private Date ts;
}