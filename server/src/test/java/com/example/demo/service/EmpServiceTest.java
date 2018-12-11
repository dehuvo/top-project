package com.example.demo.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.dao.EmpDao;
import com.example.demo.domain.Emp;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmpServiceTest {
	@Autowired
	private EmpService service;

	@Autowired
	private EmpDao dao;

	@Test
	public void testIsPwOk() {
		assertTrue(service.isPwOk("홍", "1234"));
		assertFalse(service.isPwOk("홍", "234"));
		assertFalse(service.isPwOk("nobody", "1234"));
	}

	 @Test
	 public void testInsert() {
	 	Emp emp = new Emp();
	 	emp.setCode("두령");
	 	emp.setDeptId(3);
	 	emp.setEmail("aa@gmail.com");
	 	emp.setName("임꺽정");
	 	emp.setPhone("01012345678");
	 	emp.setPw("나 두령이오.");
	 	service.insert(emp);
	 	assertTrue(service.isPwOk("두령", "나 두령이오."));
	 }

	@Test
	public void testUpdate() {
		Emp emp = dao.find(5);
		emp.setCode("아이디");
		emp.setPw("암호");
		assertEquals(1, service.update(emp));
		assertTrue(service.isPwOk("아이디", "암호"));
	}
}