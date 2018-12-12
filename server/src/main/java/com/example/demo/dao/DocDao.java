package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Doc;
import com.example.demo.domain.DocAppr;

@Mapper
public interface DocDao {

	public List<Doc> findAll();
	
	public DocAppr findByUpinfo(int deptId);
	
	@Insert("insert into doc(title,body,author,publish) values(#{title},#{body},#{author},#{publish})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Doc doc);

	@Select("select body from doc where id=#{id}")
	public String getBody(int id);
	
	public List<Doc> find(@Param("id") int id, @Param("skip") int skip, @Param("count") int count);

	public int count(int id);
	
	public int update(Doc doc);
	
	@Delete("delete from doc where id=#{id}")
	public int delete(int id);
	
	@Delete("delete from approval where doc_id=#{id}")
	public int deleteAppr(int id);
	
	public List<Doc> myDoc(int author);

	public List<Doc> aprvDoc(@Param("approver") int approver, @Param("stat") int stat);
	
	@Select("select count(*) as cnt from approval where doc_id = #{id} and stat != 0")
	public int apprCnt(int id);

}
