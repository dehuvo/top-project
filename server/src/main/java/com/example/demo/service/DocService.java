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

	/**
	 * 문서 본문과 결재선을 찾는다
	 * @param id  문서 id
	 * @return [본문, 결재선]
	 */
	public Object[] findBodyApprovals(int id) {
		return new Object[] { dao.getBody(id), approvalDao.getList(id) };
	}
	
	/**
	 * 기안 부서로 결재선을 찾는다
	 * @param deptId  기안 부서 id
	 * @return  결재선 목록
	 */
	public List<Approval> findApprovals(int deptId) {
		List<Approval> list = new ArrayList<>();
		for (Dept dept; 0 < deptId; deptId = dept.getUpId()) {
			dept = deptDao.find(deptId);
			int chief = dept.getChief();
			if (0 < chief) {
				Approval a = new Approval();
				a.setApprover(chief);            // 결재자 id
				a.setName(dept.getChiefName());  // 결재자 이름
				a.setDept(dept.getName());       // 결재자 부서 이름
				list.add(a);
			}
		}
		return list;
	}

	/**
	 * 새 문서 저장/상신
	 * @param doc 새 문서
	 * @return 1=성공 0=실패
	 */
	public int insert(Doc doc) {
		if (dao.insert(doc) == 1) {
			List<Approval> aList = findApprovals(doc.getDeptId());
			aList.get(0).setStat(doc.getStat());
			int size = Math.min(aList.size(), doc.getCount());
			int id = doc.getId();
			for (int i = 0; i < size; i++) {
				aList.get(i).setDocId(id);
				approvalDao.insert(aList.get(i));
			}
			return 1;
		}
		return 0;
	}

	/**
	 * 수정한 문서 저장/상신 
	 * @param doc  수정한 문서
	 * @return  1=성공 0=실패
	 */
	public int update(Doc doc) {
		if (dao.update(doc) == 1) {
			List<Approval> aList = doc.getApprovals();
			int size = aList.size();     // 변경 전 결재선 길이
			int count = doc.getCount();  // 변경 후 결재선 길이
			for (int i = count; i < size; i++) {
				approvalDao.delete(aList.get(i).getId());
			}
			if (size < count) {
				List<Approval> aList0 = findApprovals(doc.getDeptId());
				count = Math.min(count, aList0.size());
				int id = doc.getId();
				for (int i = size; i < count; i++) {
					aList0.get(i).setDocId(id);
					approvalDao.insert(aList0.get(i));
				}
			}
			Approval first = aList.get(0);  // 첫 결재자
			if (doc.getStat() == 2 && first.getStat() != 2) {
				first.setStat(2);           // 상신
				approvalDao.update(first);
			}
			return 1;
		}
		return 0;
	}
	
	/**
	 * 승인/반려
	 * @param aList [승인/반려 결재자, 그 전후 결재자]
	 * @return  1=성공 0=실패  
	 */
	public int approve(Approval[] aList) {
		approvalDao.update(aList[0]);      // 승인/반려 업데이트
		if (aList[1] != null) {
			approvalDao.update(aList[1]);  // 그 전/후  업데이트 
		}
		return 1;
	}

	/**
	 * 문서 삭제
	 * @param id  문서 id
	 * @return  1=성공 0=실패 
	 */
	public int delete(int id) {
		dao.deleteAppr(id);     // 결재선 삭제
		return dao.delete(id);  // 문서 삭제
	}
}