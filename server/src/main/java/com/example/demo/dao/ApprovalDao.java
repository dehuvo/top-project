package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

import com.example.demo.domain.Approval;

@Mapper
public interface ApprovalDao {
//	public List<Approval> findAll();
	
	@Insert("insert into approval(doc_id, approver) values (#{docId}, #{approver})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Approval approval);
	
	public List<Approval> getList(int docId);
	
	public int update(Approval approval);
	
	@Delete("delete from approval where id=#{id}")
	public int delete(int empno);
}