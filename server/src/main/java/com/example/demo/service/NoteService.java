package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.NoteDao;
import com.example.demo.domain.Note;

@Service
public class NoteService {
	@Autowired
	NoteDao dao;
	
	public int insert(Note note) {
		int rowsAffected = dao.insert(note);
		return rowsAffected == 1 ? note.getId() : 0;
	}
	
	public Object[] getList(int skip, int count) {
		return new Object[] { dao.count(), dao.getList(skip, count) };
	}
}