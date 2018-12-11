package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Note;

@Mapper
public interface NoteDao {
	
	@Insert("insert into note(title,body,author) values(#{title},#{body},#{author})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Note note);
	
	public int update(Note note);
	
	@Delete("delete from note where id=#{id}")
	public int delete(int empno);
	
	public List<Note> findAll();
	
	public List<Note> getList(@Param("skip") int skip, @Param("count") int count);
	
	public Note get(int id);
	
	@Select("select * from note where dept_id=#{id} order by name")
	public List<Note> findMembers(String title);
	
	@Select("select count(id) from Note")
	public int count();
	
	@Select("select body from Note where id = #{id}")
	public List<Note> findByTitle(String title);		
}