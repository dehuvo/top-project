package com.example.demo.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

import com.example.demo.domain.Dept;

@Mapper
public interface DeptDao {
	@Insert("insert into dept(name, up_id) values(#{name}, #{upId})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Dept dept);
	
	public int update(Dept dept);
	
	@Update("update dept set valid=false where id=#{id}")
	public int delete(int id);	
	
	public Dept find(int id);
	
	@Select("select coalesce(chief, 0) from dept where up_id is null and valid=true limit 1")
	public int getTopId();

	@Select("select id from dept where up_id is null and valid=true limit 1")
	public int findRoot();
	
	@Select("select id from dept where up_id=#{id} and valid=true order by dept.name")
	public int[] findSub(int id);
	
	@Select("select name from dept where id=#{id}")
	public String getName(int id);
	
	@Select("select count(*) from dept where and valid=true")
	public int count();
}