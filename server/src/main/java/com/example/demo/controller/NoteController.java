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

import com.example.demo.dao.NoteDao;
import com.example.demo.domain.Note;
import com.example.demo.service.NoteService;

@CrossOrigin("*")
@RestController
@RequestMapping("/notes")
public class NoteController {
	@Autowired
	private NoteDao dao;
	
	@Autowired
	private NoteService service;

	@GetMapping
	public Object findAll() {
		return response(dao.findAll());
	}
	
	@PostMapping("/range")
	public Object find(@RequestBody int[] range) {
		return response(dao.find(range[0], range[1]));
	}
	
	@PostMapping("/list")
	public Object getList(@RequestBody int[] range) {
		return response(service.getList(range[0], range[1]));
	}

	@PostMapping("/count")
	public Object count() {		
		return response(dao.count());
	}
	@PostMapping("/c")
	public Object findBytitle(@RequestBody String title) {
		return response(dao.findByTitle(title));
	}

	@GetMapping("/{id}")
	public Object findById(@PathVariable int id) {
		return response(dao.findOne(id));
	}

	@DeleteMapping("/{id}")
	public Object delete(@PathVariable int id) {
		return response(dao.delete(id), HttpStatus.NOT_FOUND);
	}

	@PostMapping
	public Object insert(@RequestBody Note note) {		
		return response(service.insert(note), HttpStatus.FOUND);
	}

	@PutMapping
	public Object update(@RequestBody Note note) {
		return response(dao.update(note), HttpStatus.CONFLICT);
	}	
	
}