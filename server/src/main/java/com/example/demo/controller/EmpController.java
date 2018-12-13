package com.example.demo.controller;

import static com.example.demo.controller.Util.response;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.EmpDao;
import com.example.demo.domain.Emp;
import com.example.demo.service.EmpService;

@CrossOrigin("*")
@RestController
@RequestMapping("/emp")
public class EmpController {
	@Autowired
	private EmpDao dao;
	
	@Autowired
	private EmpService service;

	@PostMapping("/c")  // 별명으로 찾기
	public Object findByCode(@RequestBody String code) {
		return response(dao.findByCode(code));
	}
	
	@PostMapping("/cc")  // 별명 사용 여부 검증  --> 사용자 수
	public Object countCode(@RequestBody String code) {
		return response(dao.countCode(code));
	}

	@PostMapping("/pw")  // (별명, 비밀번호) 검사
	public Object isPwOk(@RequestBody String[] codePw, HttpSession session) {
		return response(service.isPwOk(codePw[0], codePw[1]));
	}

	@PostMapping
	public Object insert(@RequestBody Emp emp) {
		return response(service.insert(emp), HttpStatus.FOUND);
	}

	@PutMapping
	public Object update(@RequestBody Emp emp) {
		return response(service.update(emp), HttpStatus.CONFLICT);
	}

	@DeleteMapping("/{id}")
	public Object delete(@PathVariable int id) {
		return response(service.delete(id), HttpStatus.NOT_FOUND);
	}
}