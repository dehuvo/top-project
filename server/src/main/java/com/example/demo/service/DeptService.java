package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DeptDao;
import com.example.demo.dao.EmpDao;
import com.example.demo.domain.Dept;
import com.example.demo.domain.Emp;

@Service
public class DeptService {
	@Autowired
	DeptDao dao;

	@Autowired
	EmpDao empDao;

	/**
	 * 새 부서 데이터를 추가한다
	 * @param dept  부서 데이터
	 * @return  부서 id
	 */
	public int insert(Dept dept) {
		int rowsAffected = dao.insert(dept);
		return rowsAffected == 1 ? dept.getId() : 0;
	}

	/**
	 * 회사 조직도 데이터를 얻는다
	 * @return  조직도 데이터
	 */
	public Dept getDept() {
		return getDept(dao.findRoot());
	}

	// 부서 하위 조직도를 얻는다 (부서 id)
	/**
	 * 부서와 그 하위 부서의 조직도 데이터를 얻는다
	 * @param id  부서 id
	 * @return  조직도 데이터
	 */
	private Dept getDept(int id) {
		Dept dept = dao.find(id);
		List<Dept> sub = new ArrayList<>();
		for (int subId : dao.findSub(id)) {
			sub.add(getDept(subId));
		}
		dept.setSub(sub);
		return dept;
	}

	public List<Object[]> getNames() {
		return getNames(dao.findRoot(), "");
	}

	private List<Object[]> getNames(int id, String prefix) {
		Dept dept = dao.find(id);
		List<Object[]> list = new ArrayList<>();
		dept.setName(prefix + dept.getName());
		list.add(new Object[] { dept.getId(), dept.getName() });
		for (int subId : dao.findSub(id)) {
			list.addAll(getNames(subId, prefix + "\u2800\u2800\u2800\u2800\u2800\u2800"));
		}
		return list;
	}

	/**
	 * 부서 소속 직원 리스트를 이름 순으로 얻는다
	 * @param id  부서 id
	 * @return  직원 리스트
	 */
	public List<Emp> findMembers(int id) {
		List<Emp> emps = new ArrayList<>();
		findMembers(emps, id);
		emps.sort((a, b) -> a.getName().compareTo(b.getName()));
		return emps;
	}

	/**
	 * 부서 소속 직원 리스트를 채운다
	 * @param emps  직원 리스트
	 * @param id  부서 id
	 */
	private void findMembers(List<Emp> emps, int id) {
		emps.addAll(empDao.findMembers(id));
		for (int subId : dao.findSub(id)) {
			findMembers(emps, subId);
		}
	}
}