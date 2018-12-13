package com.example.demo.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Approval {
	private int id;
	private int docId;     // 문서 id
	private int approver;  // 결재자 id
	private String name;   // 결재자 이름
	private String dept;   // 결재자 부서 이름
	private int stat;      // 상태: 0=저장 1=반려 2=대기 3=승인
	private String memo;   // 반려 사유, 결재 의견
	private Date ts;
}