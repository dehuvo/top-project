package com.example.demo.service;

import static com.example.demo.service.Util.encrypt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ApprovalDao;
import com.example.demo.dao.DeptDao;
import com.example.demo.dao.DocDao;
import com.example.demo.domain.Approval;
import com.example.demo.domain.Dept;
import com.example.demo.domain.Doc;
import com.example.demo.domain.Emp;

@Service
public class DocService {
	@Autowired
	DocDao dao;
	
	@Autowired
	ApprovalDao approvalDao;

	@Autowired
	DeptDao deptDao;

	public int delete(int id) {
		dao.deleteAppr(id);
		return dao.delete(id);
	}

	public int insert(Doc doc) {
		int rowsAffected = dao.insert(doc);
		return rowsAffected == 1 ? doc.getId() : 0;
	}

	public int inserts(Approval[] approvals) {
		for (Approval a: approvals) {
			approvalDao.insert(a);
		}
		return 1;
	}

	public Object[] find(int id, int skip, int count) {
		List<Doc> list = dao.find(id, 0, 100);
		return list.size() == 0 ?  new Object[] { 0, new ArrayList<Doc>() } :
		                           new Object[] { list.size(), list };
	}
	
	public Object[] findOne(int id) {
		return new Object[] { dao.getBody(id), approvalDao.getList(id) };
	}
	
	public List<Approval> findApprovals(int deptId) {
		List<Approval> list = new ArrayList<>();
		for (Dept dept; 0 < deptId; deptId = dept.getUpId()) {
			dept = deptDao.findOne(deptId);
			Approval a = new Approval();
			a.setApprover(dept.getChief());
			a.setName(dept.getChiefName());
			a.setDept(dept.getName());
			list.add(a);			
		}
		return list;
	}
}