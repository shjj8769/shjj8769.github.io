# 신현진 포트폴리오

**🔗 https://shjj8769.github.io**

- 사용 기술: HTML · CSS · JavaScript
- 이메일: shjj8769@gmail.com

## 구성

- 연구 관심분야
- 학력
- 프로젝트 (슬라이드 뷰어 포함)
- 자격증
- 수상
- 기술

## 주요 기능

- 한국어 / English 전환
- 프로젝트별 슬라이드 뷰어 (이전·다음, 크게 보기, 방향키 이동)
- 스크롤을 따라가는 목차
- 인쇄 / PDF 저장 (A4 레이아웃)

## 파일 구조

| 파일 | 역할 |
| --- | --- |
| `index.html` | 페이지 기본 구조 |
| `style.css` | 화면 및 인쇄 디자인 |
| `content.js` | 한국어·영어 본문 내용 |
| `slides.js` | 프로젝트별 슬라이드 목록 |
| `script.js` | 화면 표시 및 동작 |
| `assets/slides/` | 프로젝트 슬라이드 이미지 |
| `favicon.svg` | 브라우저 탭 아이콘 |
| `preview.mjs` | 로컬 미리보기 서버 (선택) |

## 로컬에서 미리보기

`index.html`을 더블 클릭하면 바로 열립니다. 로컬 서버로 확인하려면 Node.js 설치 후 다음 명령을 실행하세요.

```
node preview.mjs
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다. 종료는 `Ctrl+C`입니다.


## 내용 수정

- 본문: `content.js` (`ko` 한국어, `en` 영어)
- 슬라이드: `assets/slides/`의 이미지를 교체하고 `slides.js` 목록을 수정
- 디자인: `style.css` 상단의 CSS 변수
