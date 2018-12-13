package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Approval;

@Mapper
public interface ApprovalDao {
	@Insert("insert into approval(doc_id,approver,stat) values (#{docId},#{approver},#{stat})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Approval approval);
	
	public List<Approval> getList(int docId);
	
	public int update(Approval approval);
	
	@Delete("delete from approval where id=#{id}")
	public int delete(int empno);
}