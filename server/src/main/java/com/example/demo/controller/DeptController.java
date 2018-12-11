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

import com.example.demo.dao.DeptDao;
import com.example.demo.domain.Dept;
import com.example.demo.service.DeptService;

@CrossOrigin("*")
@RestController
@RequestMapping("/dept")
public class DeptController {
	@Autowired
	private DeptDao dao;

	@Autowired
	private DeptService service;

	@GetMapping()
	public Object getDept() {
		return response(service.getDept());
	}

	@GetMapping("/name")
	public Object getNames() {
		return response(service.getNames());
	}

	@GetMapping("/m/{id}")
	public Object findMembers(@PathVariable int id) {
		return response(service.findMembers(id));
	}

	@PostMapping
	public Object insert(@RequestBody Dept dept) {
		return response(service.insert(dept), HttpStatus.FOUND);
	}

	@PutMapping
	public Object update(@RequestBody Dept dept) {
		return response(dao.update(dept), HttpStatus.CONFLICT);
	}

	@DeleteMapping("/{id}")
	public Object delete(@PathVariable int id) {
		return response(dao.delete(id), HttpStatus.NOT_FOUND);
	}
}