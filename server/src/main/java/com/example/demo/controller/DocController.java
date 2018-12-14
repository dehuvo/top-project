package com.example.demo.controller;

import static com.example.demo.controller.Util.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.DocDao;
import com.example.demo.domain.Approval;
import com.example.demo.domain.Doc;
import com.example.demo.service.DocService;

@CrossOrigin("*")
@RestController
@RequestMapping("/doc")
public class DocController {
	@Autowired
	private DocDao dao;
	
	@Autowired
	private DocService service;
	
	@GetMapping("/list/{userId}/{rows}")  // 목록 보기
	public Object getList(@PathVariable int userId, @PathVariable int rows) {
		return response(dao.getList(userId, rows));
	}
	
	@GetMapping("/{id}")  // 상세 보기
	public Object findByDoc(@PathVariable int id) {
		return response(service.findBodyApprovals(id));
	}

	@GetMapping("/a/{deptId}")  // 결재선 찾기
	public Object findApprovals(@PathVariable int deptId) {
		return response(service.findApprovals(deptId));
	}
	
	@PatchMapping  // 승인/반려
	public Object approve(@RequestBody Approval[] as) {
		return response(service.approve(as), HttpStatus.CONFLICT);
	}	
	
	@PostMapping  // 등록
	public Object insert(@RequestBody Doc doc) {
		return response(service.insert(doc));
	}
	
	@PutMapping  // 수정
	public Object update(@RequestBody Doc doc) {
		return response(service.update(doc), HttpStatus.CONFLICT);
	}	
	
	@DeleteMapping("/{id}")  // 삭제
	public Object delete(@PathVariable int id) {
		return response(service.delete(id), HttpStatus.NOT_FOUND);
	}
}