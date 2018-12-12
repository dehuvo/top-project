package com.example.demo.service;

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

	public int insert(Doc doc, int approvalCount, int stat) {
		if (dao.insert(doc) == 1) {
			int id = doc.getId();
			List<Approval> list = findApprovals(id);
			if (approvalCount < list.size()) {
				list = list.subList(0, approvalCount);
			}
			if (0 < stat) {
				list.get(0).setStat(stat);
			}
			for (Approval a: list) {
				if (approvalDao.insert(a) == 0) return 0;
			}
			return 1;
		}
		return 0;
	}

	public int update(Doc doc, int approvalCount, int stat) {
		if (dao.update(doc) == 1) {
			int id = doc.getId();
			List<Approval> list = doc.getApprovals();
			int size = list.size();
			for (int i = approvalCount; i < size; i++) {
				approvalDao.delete(list.get(i).getId());
			}
			if (size < approvalCount) {
				List<Approval> list0 = findApprovals(id);
				for (int i = size; i < approvalCount; i++) {
					approvalDao.insert(list0.get(i));
				}
			}
			if (stat != list.get(0).getStat()) {
				list.get(0).setStat(stat);
				approvalDao.update(list.get(0));
			}
			return 1;
		}
		return 0;
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
			dept = deptDao.find(deptId);
			Approval a = new Approval();
			a.setApprover(dept.getChief());
			a.setName(dept.getChiefName());
			a.setDept(dept.getName());
			list.add(a);			
		}
		return list;
	}
}