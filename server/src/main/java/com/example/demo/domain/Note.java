package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
	private int id;
	private String title;  // 제목
	private String body;   // 본문
	private int author;    // 글쓴이 id
	private String name;   // 글쓴이 이름
	private String code;   // 글쓴이 별명
	private String ts;
}