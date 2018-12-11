package com.example.demo.dao;

//import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NoteDaoTest {
	@Autowired
	private NoteDao dao;

	@Test
	public void testInsert() {
	}

	@Test
	public void testUpdate() {
	}

	@Test
	public void testDelete() {
	}

	@Test
	public void testFindAll() {
	}

	@Test
	public void testFind() {
		dao.find(1, 2).forEach(System.out::println);
	}

	@Test
	public void testFindOne() {
	}

	@Test
	public void testFindMembers() {
	}

	@Test
	public void testCount() {
	}

	@Test
	public void testFindByTitle() {
	}
}