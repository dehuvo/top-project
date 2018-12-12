// 사원
export interface Emp {
  id: number;
  name: string;       // 이름
  deptId: number;     // 소속 부서 id
  deptName: string;   // 소속 부서 이름
  code: string;       // 별명
  pw: string;         // 비밀번호
  phone: string;      // 전화번호
  email: string;      // 이메일 주소
}

// 부서
export interface Dept {
  id: number;
  name: string;       // 이름
  chief: number;      // 리더 id
  chiefName: string;  // 리더 이름
  upId: number;       // 상위 부서 id
  upName: string;     // 상위 부서 이름
  sub: Dept[];        // 하위 부서 배열
}