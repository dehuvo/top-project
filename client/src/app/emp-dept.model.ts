export interface Emp {
  id: number;
  deptId: number;
  name: string;
  code: string;
  pw: string;
  pw2 : string;
  phone: string;
  email: string;
  deptName: string;
}

export interface Dept {
  id: number;
  name: string;       // 부서 이름
  chief: number;      // 리더 id
  chiefName: string;  // 리더 이름
  upId: number;       // 상위 부서 id
  upName: string;     // 상위 부서 이름
  sub: Dept[];        // 하위 부서 배열
}