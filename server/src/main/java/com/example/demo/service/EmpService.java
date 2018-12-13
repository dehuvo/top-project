package com.example.demo.service;

import static com.example.demo.service.Util.encrypt;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DeptDao;
import com.example.demo.dao.EmpDao;
import com.example.demo.domain.Emp;

@Service
public class EmpService {
	@Autowired
	EmpDao dao;
	
	@Autowired
	DeptDao deptDao;

	public boolean isPwOk(String code, String pw) {
		return Arrays.equals((byte[]) dao.findPw(code), encrypt(pw));
	}

	public int insert(Emp emp) {
		int rowsAffected = dao.insert(emp, encrypt(emp.getPw()));
		return rowsAffected == 1? emp.getId(): 0;
	}

	public int update(Emp emp) {
		String pw = emp.getPw();
		return dao.update(emp, pw == null || pw.isEmpty() ? null : encrypt(pw));
	}
	
	public int delete(int id) {
		dao.deleteChief(id);
		return dao.delete(id);
	}
}