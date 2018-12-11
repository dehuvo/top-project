package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocApprDetail {
	private int doc_id;
	private int approver;
	private String approverName;
	private String deptName;
	private int stat;
	private String reason;
}
