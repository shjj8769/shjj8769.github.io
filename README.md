# 신현진 포트폴리오

신현진의 연구 관심분야, 학력, 프로젝트, 자격증, 수상 및 기술을 정리한 PC 중심의 포트폴리오입니다. 프로젝트마다 설명 옆에 별도의 슬라이드 뷰어가 있습니다. 제공된 PPT 네 개의 총 18장을 웹용 이미지로 변환했으며 원본 PPT는 수정하지 않았습니다.

## 바로 열기

`index.html`을 더블 클릭하면 기본 브라우저에서 열립니다. 별도의 설치나 빌드가 필요하지 않습니다.

로컬 서버로 열려면 이 폴더에서 다음 명령을 실행하세요. Node.js가 필요합니다.

```powershell
node preview.mjs
```

터미널에 표시되는 `Local` 주소를 브라우저에서 엽니다. 기본 포트는 4173이며, 사용 중이면 다음 포트를 사용합니다. 서버를 종료하려면 `Ctrl+C`를 누르세요.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| `index.html` | 프로필, 가로 목차와 본문의 기본 구조 |
| `style.css` | 색상, 여백, 글꼴, PC 화면과 A4 인쇄 디자인 |
| `content.js` | 한국어·영어 프로필 및 각 항목의 내용 |
| `script.js` | 내용 표시, 언어 전환, 현재 목차 표시, 인쇄 버튼 |
| `slides.js` | 프로젝트별 슬라이드 이미지 경로와 제목 |
| `assets/slides/` | 웹에서 표시하는 프로젝트별 슬라이드 이미지 |
| `favicon.svg` | 브라우저 탭 아이콘 |
| `preview.mjs` | 선택적으로 사용하는 로컬 미리보기 서버 |

## 나중에 내용 바꾸기

`content.js`에서 `ko`는 한국어, `en`은 영어 내용입니다. 프로필의 이름·소개·연락처와 각 섹션의 목록을 바꾸고 저장한 다음 브라우저를 새로고침하세요. 항목을 추가하려면 같은 형태의 항목을 복사해서 목록에 추가합니다. 섹션 목록을 바꾸면 목차도 자동으로 바뀝니다.

날짜, 제목, 소속, 설명과 링크는 각 항목에 모여 있습니다. 디자인을 바꾸려면 `style.css`를 수정하면 됩니다. 색상과 폭 등 기본 값은 파일 상단의 CSS 변수에서 조정할 수 있습니다.

이메일과 전화번호는 이름 아래에 표시됩니다. 연락처를 수정하려면 `content.js`의 각 언어 `profile.links`에 `{ label: "표시할 이름", url: "실제 URL", icon: "mail" }` 형식으로 추가하세요. 이메일 URL은 `mailto:`, 전화번호 URL은 `tel:`로 시작하며 전화 아이콘은 `icon: "phone"`을 사용합니다. GitHub는 `icon: "github"`, 웹사이트는 `icon: "link"`를 사용합니다. 첫 수상의 발급기관은 고려대학교 AI중심대학사업단입니다.

## 포함된 동작

- 목차 클릭으로 섹션 이동 및 스크롤 위치에 따른 현재 항목 표시
- 한국어·영어 본문 전환
- 프로젝트별 이전·다음 버튼 및 현재 슬라이드 번호 표시
- 이미지 또는 크게 보기 버튼으로 확대하고, 확대 화면 안에서도 페이지 이동
- 뷰어에 포커스가 있을 때 방향키와 Home/End로 페이지 이동
- 가로 목차를 스크롤 중에도 유지
- 섹션 제목과 본문의 구분, 항목 제목과 날짜의 나란한 배치
- 인쇄 / PDF 저장 버튼 및 A4용 인쇄 디자인
- 키보드 탐색, 본문 바로가기, 동작 줄이기 설정 지원

PDF를 저장하려면 화면의 인쇄 버튼을 누른 다음 브라우저 인쇄 창의 대상에서 ‘PDF로 저장’을 선택하세요. 브라우저 머리글·바닥글은 필요에 따라 끌 수 있습니다.

## 웹에 게시할 파일

`index.html`, `style.css`, `content.js`, `slides.js`, `script.js`, `favicon.svg`와 `assets` 폴더를 같은 구조로 올리면 됩니다. 별도 PowerPoint 뷰어, 서버 프로그램이나 외부 슬라이드 서비스가 필요하지 않습니다. 이미지 경로는 상대 경로여서 프로젝트 하위 주소에서도 동작합니다. 원본 PPTX는 게시에 필요하지 않습니다.

슬라이드는 프로젝트별 6장, 2장, 6장, 4장입니다. 내용을 바꾸려면 원본 PPT를 수정한 뒤 다시 이미지로 변환하고 `slides.js`의 목록을 갱신하세요. 현재 뷰어는 슬라이드 이미지를 보여주며 PPT 애니메이션은 재생하지 않습니다. 인쇄 시에는 각 프로젝트의 첫 슬라이드가 포함됩니다.


## 영문 명칭 확인 근거

2026-10-15 공식 기관 자료에서 표기를 확인했습니다.

- Hanshin University / Department of Applied Statistics: [한신대학교 영문 학과 소개](https://www.hs.ac.kr/eng/7368/subview.do)
- Division of Software Convergence: [한신대학교 발행 논문지 2025.12, 첫 페이지의 소속 표기](https://www.hs.ac.kr/sites/infoscience/contents/images/2026/03/20260305_104743739_54631.pdf#page=1). 학교 발행 자료의 실제 사용 명칭이며 영문 증명서와 대조한 것은 아닙니다.
- Survey Analyst, Junior: [Q-Net 종목 정보](https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503&jmCd=9521). 원문 쉼표 뒤 공백만 정리했습니다.
- Human Resources Development Service of Korea (HRD Korea): [한국산업인력공단 공식 영문 약관](https://eps.hrdkorea.or.kr/e9/user/member/member.do?method=foreignerEngAgree)
- Structured Query Language Developer (SQLD): [DataQ 공식 2022 안내서](https://www.dataq.or.kr/www/dataq_brochure_2022.pdf)
- Korea Data Agency (K-DATA): [한국데이터산업진흥원](https://www.kdata.or.kr/), [자격검정 사업 소개](https://www.kdata.or.kr/kr/contents/manpower_03_01/view.do)
- Korean Association of Data Science (KADS): [학회 공식 홈페이지](https://www.koreadatascience.org/), [약칭이 명시된 공식 공지](https://www.koreadatascience.org/news/notice?id=2)
- 고려대학교 AI중심대학사업단: [공식 사업단 페이지](https://ku-ai.korea.ac.kr/swuniv/about/location.do). 현 페이지의 영문 배너에는 옛 SW 사업 명칭이 남아 있어 AI 사업단의 공식 영문으로 사용하지 않았습니다. 사이트의 AI-Centered University Project Group, Korea University는 한국어 기관명의 설명 번역입니다.

슬라이드 하단 캡션과 대체 텍스트는 slides.js의 한국어·영어 필드에서 관리합니다. 영어 모드에서는 확대창의 제목과 이미지 설명도 같은 언어로 표시합니다. 슬라이드 이미지 자체는 제공된 PPT 원본을 유지합니다.
