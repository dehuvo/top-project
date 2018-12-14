drop database if exists test;
create database test character set 'utf8mb4' collate 'utf8mb4_unicode_ci';
use test;

set names 'utf8mb4' collate 'utf8mb4_unicode_ci';

drop table if exists note;
drop table if exists approval;
drop table if exists doc;
drop table if exists emp;
drop table if exists dept;

create table dept (
  id int not null auto_increment primary key comment '부서 id', 
  name varchar(20) not null comment '부서이름', 
  chief int null comment '리더',
  up_id int null comment '상위부서 id',
  valid boolean not null default true comment '유효 여부',
  foreign key(up_id) references dept(id) on update cascade
) engine=InnoDB comment='부서';

create table emp (
  id int not null auto_increment primary key comment '사원 id',
  dept_id int not null comment '부서 id',  
  name varchar(20) not null comment '사원이름',
  code varchar(20) not null unique comment '로그인 아이디',
  pw binary(32) not null comment '비밀번호',
  phone varchar(20) not null comment '전화번호',
  email varchar(50) not null comment '이메일 주소',
  valid boolean not null default true comment '유효 여부',
  foreign key(dept_id) references dept(id) on update cascade      
) engine=InnoDB comment='사원';

create table doc (
  id int not null auto_increment primary key comment '문서번호',
  title varchar(1000) not null comment '제목',
  body varchar(5000) not null comment '내용',
  publish boolean not null default false comment '공지여부',
  author int not null comment '작성자',
  ts datetime default current_timestamp on update current_timestamp comment '수정일시',
  foreign key(author) references emp(id) on update cascade
) engine=InnoDB comment='문서';

create table approval (
  id int not null auto_increment primary key comment '승인번호',
  doc_id int not null comment '문서번호',
  approver int not null comment '결재자',
  stat int not null default 0 comment '상태: 0=저장 1=반려 2=대기 3=승인',
  memo varchar(1000) null comment '결재의견,반려사유',
  ts datetime default current_timestamp on update current_timestamp comment '수정일시',  
  foreign key(doc_id) references doc(id) on update cascade,
  foreign key(approver) references emp(id) on update cascade
) engine=InnoDB comment='결재';

create table note (
  id int not null auto_increment primary key comment '글번호',
  title varchar(1000) not null comment '제목',
  body varchar(5000) not null comment '내용',  
  author int not null comment '글쓴이',
  ts datetime default current_timestamp on update current_timestamp comment '수정일시',
  foreign key(author) references emp(id) on update cascade
) engine=InnoDB comment='게시판';