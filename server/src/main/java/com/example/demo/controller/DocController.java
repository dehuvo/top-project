package com.example.demo.controller;

import static com.example.demo.controller.Util.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/docs")
public class DocController {
	@Autowired
	private DocDao dao;
	
	@Autowired
	private DocService service;
	
	// 전자결재 전체조회
	@GetMapping
	public Object findAll() {
		return response(dao.findAll());
	}
	
	// 전자결재 상세보기
	@GetMapping("/{id}")
	public Object findByDoc(@PathVariable int id) {
		return response(service.findOne(id));
	}
	
	// 전자결재 등록 시 상위 부서장 조회
	@PostMapping("/u")
	public Object findByUpinfo(@RequestBody int deptId) {
		return response(dao.findByUpinfo(deptId));
	}	
	
	// 전자결재 등록
	@PostMapping
	public Object insert(@RequestBody Doc doc) {
		response(dao.insert(doc));
		return doc.getId();
	}
	
	@PostMapping("/a")
	public Object inserts(@RequestBody Approval[] approvals) {
		return response(service.inserts(approvals), HttpStatus.FOUND);
	}
	
	// 전자결재 수정
	@PutMapping
	public Object update(@RequestBody Doc doc) {
		return response(dao.update(doc), HttpStatus.CONFLICT);
	}	
	
	// 전자결재 삭제
	@DeleteMapping("/{id}")
	public Object delete(@PathVariable int id) {
		return response(service.delete(id), HttpStatus.NOT_FOUND);
	}
	
	/**
	 * 전자결재 - 결재상신 리스트 조회
	 * @param author - 작성자(세션ID)
	 * @return list<Doc>
	 */
	@PostMapping("/my")
	public Object myDoc(@RequestBody int author) {
		return response(dao.myDoc(author));
	}
	
	/**
	 * 전자결재 - 결재승인,완료 리스트 조회
	 * @param arg[0] : approver - 결재자(세션ID)
	 * @param arg[1] : stat 		- 결재여부(0:결재상신/2:완료)
	 * @return list<Doc>
	 */
	@PostMapping("/aprv")
	public Object aprvDoc(@RequestBody int[] arg) {
		return response(dao.aprvDoc(arg[0], arg[1]));
	}
	
	@PostMapping("/range")
	public Object find(@RequestBody int[] range) {
		return response(service.find(range[0], range[1], range[2]));
	}

	@GetMapping("/appr/{deptId}")
	public Object findApprovals(@PathVariable int deptId) {
		return response(service.findApprovals(deptId));
	}

	@PostMapping("/c")
	public Object apprCnt(@RequestBody int id) {
		return response(dao.apprCnt(id));
	}	
}