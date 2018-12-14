export interface Note {
    id: number;
    title: string;   // 제목
    body: string;    // 본문
    author: number;  // 글쓴이
    name: string;    // 글쓴이 이름
    code: string;    // 글쓴이 별명
    ts: Date;
}