/* 프로필과 본문은 이 파일에서 수정합니다. 연락처는 profile.links에서 수정하세요. */
window.CV_CONTENT = {
  "ko": {
    "ui": {
      "brand": "PORTFOLIO",
      "brandAriaLabel": "포트폴리오 맨 위로",
      "documentAriaLabel": "개인 포트폴리오",
      "languageLabel": "언어 선택",
      "print": "인쇄 / PDF",
      "sidebarTitle": "목차",
      "kicker": "PERSONAL PORTFOLIO",
      "profileLabel": "연구 · 프로젝트",
      "footer": "신현진 · Portfolio",
      "backToTop": "맨 위로",
      "pageTitle": "신현진 | Portfolio",
      "description": "비정형 텍스트와 경제 현상을 탐구하는 신현진의 연구 관심분야, 학력과 프로젝트 포트폴리오.",
      "skipLink": "본문으로 이동",
      "toolsLabel": "사용 기술",
      "periodLabel": "수행 기간",
      "outcomesLabel": "기대효과",
      "viewer": {
        "previous": "이전",
        "next": "다음",
        "expand": "크게 보기",
        "close": "닫기",
        "slidesLabel": "프로젝트 슬라이드",
        "empty": "슬라이드를 준비하고 있습니다."
      }
    },
    "profile": {
      "name": "신현진",
      "links": [
        {
          "label": "shjj8769@gmail.com",
          "url": "mailto:shjj8769@gmail.com",
          "icon": "mail"
        },
        {
          "label": "+82 10-4932-8769",
          "url": "tel:+821049328769",
          "icon": "phone"
        }
      ],
      "printAddress": ""
    },
    "sections": [
      {
        "id": "research",
        "type": "topics",
        "title": "연구 관심분야",
        "translation": "Research Interests",
        "statement": "비정형 텍스트를 경제 현상을 설명하는 데이터로 전환하는 데 관심을 두고, 경제 뉴스 기반 시장 심리 지수 구축과 그 설명력 검증을 탐구하고자 합니다.",
        "topics": [
          "데이터 사이언스",
          "자연어처리",
          "시장심리분석",
          "텍스트기반지표"
        ]
      },
      {
        "id": "education",
        "type": "entries",
        "title": "학력",
        "translation": "Education",
        "entries": [
          {
            "title": "한신대학교",
            "subtitle": "복수전공",
            "details": [
              "응용통계학과 학사 졸업 예정(2027.02) · GPA 3.89 / 4.5",
              "소프트웨어융합학부 학사 졸업 예정(2027.02) · GPA 4.09 / 4.5"
            ]
          }
        ]
      },
      {
        "id": "projects",
        "type": "projects",
        "title": "프로젝트",
        "translation": "Selected Projects",
        "entries": [
          {
            "id": "kmmvi",
            "title": "공공데이터 융합 기반 고령층 의료 이동 취약지역 발굴을 위한 K-MMVI 프레임워크",
            "date": "2026.05 – 2026.06",
            "tools": [
              "Git",
              "Python"
            ],
            "summary": "초고령화 사회 진입에 따른 지방 소멸과 지역 간 의료 격차 문제를 해결하기 위해, 인구 통계와 보건의료 접근성, 대중교통 인프라 데이터를 복합적으로 융합한 ‘한국형 의료 이동 취약성 지수(K-MMVI)’ 기반 프레임워크를 제안합니다."
          },
          {
            "id": "heart",
            "title": "기계학습 — 심장병 예측 분석",
            "date": "2026.04 – 2026.05",
            "tools": [
              "R"
            ],
            "summary": "기존 데이터에서 운동·생리 관련 설명변수를 선별하고 반응변수와의 관계를 확인했습니다. 적합한 모델을 구축하고 성능을 평가해 분석 결과를 도출했습니다.",
            "details": [
              "KNN 정규화, 의사결정나무(C5.0), 로지스틱 회귀분석을 적용했습니다."
            ]
          },
          {
            "id": "qshing",
            "title": "QshingGuard: 위치·맥락 기반 QR 피싱(Qshing) 실시간 차단 시스템",
            "date": "2026.04 – 2026.05",
            "tools": [
              "R",
              "SPSS"
            ],
            "summary": "QR코드를 악용한 피싱 공격(Qshing)에 대응하기 위해 AI와 블록체인 기술을 결합한 실시간 QR 보안 인증 플랫폼을 기획했습니다.",
            "details": [
              "이상 징후가 발견되면 API 호출을 즉시 차단하는 방식을 기획했습니다.",
              "정상 QR은 블록체인 기반 해시 검증을 통해 위·변조 여부를 확인하고자 했습니다."
            ],
            "outcomes": [
              "금융 정보 탈취 방지",
              "변조된 QR 공격 차단 및 안전한 QR 인증 인프라 제공"
            ]
          },
          {
            "id": "survey",
            "title": "통계조사 분석 보고서",
            "date": "2025.03 – 2025.05",
            "tools": [
              "FastAPI",
              "Python",
              "Claude AI"
            ],
            "summary": "서울시 고립·은둔 청년 가구 실태조사 설문 자료를 활용해 청년 가구원의 고립·은둔 여부와 가족의 인식, 지원 필요성을 다각도로 분석했습니다.",
            "details": [
              "A영역(고립·은둔 여부 확인): 구조적 요인에 따른 변화를 확인했습니다.",
              "B영역(고립·은둔 가족의 어려움 및 필요사항): 가족의 대응 방식과 정책적 지원을 분석했습니다."
            ]
          }
        ]
      },
      {
        "id": "certifications",
        "type": "entries",
        "title": "자격증",
        "translation": "Certifications",
        "entries": [
          {
            "title": "사회조사분석사 2급",
            "subtitle": "한국산업인력공단(Q-Net)"
          },
          {
            "title": "SQL 개발자(SQLD)",
            "subtitle": "한국데이터산업진흥원(K-DATA)"
          }
        ]
      },
      {
        "id": "awards",
        "type": "entries",
        "title": "수상",
        "translation": "Honors & Awards",
        "entries": [
          {
            "title": "AI·블록체인 비즈니스 모델 경진대회 우수상",
            "subtitle": "고려대학교 AI중심대학사업단"
          },
          {
            "title": "하계종합학술대회 장려상",
            "subtitle": "한국데이터사이언스학회"
          }
        ]
      },
      {
        "id": "skills",
        "type": "skills",
        "title": "기술",
        "translation": "Technical Skills",
        "rows": [
          {
            "label": "프로그래밍",
            "value": "Python, R, Dart, SQL"
          },
          {
            "label": "통계·머신러닝",
            "value": "SPSS, 가설검정(카이제곱), 로지스틱 회귀분석, 의사결정나무(C5.0)"
          },
          {
            "label": "서비스·개발",
            "value": "FastAPI, Flutter, Firebase"
          },
          {
            "label": "DB·도구",
            "value": "MySQL, GitHub"
          }
        ]
      }
    ]
  },
  "en": {
    "ui": {
      "brand": "PORTFOLIO",
      "brandAriaLabel": "Back to the top of the portfolio",
      "documentAriaLabel": "Personal portfolio",
      "languageLabel": "Choose language",
      "print": "Print / PDF",
      "sidebarTitle": "Contents",
      "kicker": "PERSONAL PORTFOLIO",
      "profileLabel": "Research & Projects",
      "footer": "Shin Hyeonjin · Portfolio",
      "backToTop": "Back to top",
      "pageTitle": "Shin Hyeonjin | Portfolio",
      "description": "Research interests, education and projects by Shin Hyeonjin, exploring unstructured text as data for understanding economic phenomena.",
      "skipLink": "Skip to content",
      "toolsLabel": "Tools",
      "periodLabel": "Period",
      "outcomesLabel": "Expected benefits",
      "viewer": {
        "previous": "Previous",
        "next": "Next",
        "expand": "Enlarge",
        "close": "Close",
        "slidesLabel": "Project slides",
        "empty": "Slides are being prepared."
      }
    },
    "profile": {
      "name": "Shin Hyeonjin",
      "links": [
        {
          "label": "shjj8769@gmail.com",
          "url": "mailto:shjj8769@gmail.com",
          "icon": "mail"
        },
        {
          "label": "+82 10-4932-8769",
          "url": "tel:+821049328769",
          "icon": "phone"
        }
      ],
      "printAddress": ""
    },
    "sections": [
      {
        "id": "research",
        "type": "topics",
        "title": "Research Interests",
        "translation": "연구 관심분야",
        "statement": "I am interested in turning unstructured text into data that helps explain economic phenomena. I aim to develop a market sentiment index from economic news and examine its explanatory power.",
        "topics": [
          "Data Science",
          "Natural Language Processing",
          "Market Sentiment Analysis",
          "Text-Based Indicators"
        ]
      },
      {
        "id": "education",
        "type": "entries",
        "title": "Education",
        "translation": "학력",
        "entries": [
          {
            "title": "Hanshin University",
            "subtitle": "Double major",
            "details": [
              "Department of Applied Statistics · Bachelor’s degree expected (Feb. 2027) · GPA 3.89 / 4.5",
              "Division of Software Convergence · Bachelor’s degree expected (Feb. 2027) · GPA 4.09 / 4.5"
            ]
          }
        ]
      },
      {
        "id": "projects",
        "type": "projects",
        "title": "Selected Projects",
        "translation": "프로젝트",
        "entries": [
          {
            "id": "kmmvi",
            "title": "K-MMVI: A public-data framework for identifying medical mobility vulnerability among older adults",
            "date": "2026.05 – 2026.06",
            "tools": [
              "Git",
              "Python"
            ],
            "summary": "A framework based on the Korean Medical Mobility Vulnerability Index (K-MMVI), combining population statistics, healthcare accessibility and public transport infrastructure data to address regional medical disparities and population decline in a super-aged society."
          },
          {
            "id": "heart",
            "title": "Machine learning for heart disease prediction",
            "date": "2026.04 – 2026.05",
            "tools": [
              "R"
            ],
            "summary": "Selected exercise-related and physiological predictors from an existing dataset, examined their relationship with the response variable, and built and evaluated suitable prediction models.",
            "details": [
              "Applied normalized KNN, C5.0 decision trees and logistic regression."
            ]
          },
          {
            "id": "qshing",
            "title": "QshingGuard: Location- and context-based protection against QR phishing",
            "date": "2026.04 – 2026.05",
            "tools": [
              "R",
              "SPSS"
            ],
            "summary": "Planned a real-time QR security authentication platform combining AI and blockchain to address phishing attacks that exploit QR codes.",
            "details": [
              "Proposed immediately blocking API calls when suspicious activity is detected.",
              "Proposed blockchain-based hash verification to identify tampering with legitimate QR codes."
            ],
            "outcomes": [
              "Prevent the theft of financial information",
              "Block tampered QR attacks and provide safer QR authentication infrastructure"
            ]
          },
          {
            "id": "survey",
            "title": "Statistical survey analysis report",
            "date": "2025.03 – 2025.05",
            "tools": [
              "FastAPI",
              "Python",
              "Claude AI"
            ],
            "summary": "Analyzed survey data on households with socially isolated or withdrawn young people in Seoul, examining isolation status, family perceptions and support needs.",
            "details": [
              "Section A: Examined variation in isolation and withdrawal status across structural factors.",
              "Section B: Analyzed family responses, difficulties and needs for policy support."
            ]
          }
        ]
      },
      {
        "id": "certifications",
        "type": "entries",
        "title": "Certifications",
        "translation": "자격증",
        "entries": [
          {
            "title": "Survey Analyst, Junior",
            "subtitle": "Human Resources Development Service of Korea (HRD Korea)"
          },
          {
            "title": "Structured Query Language Developer (SQLD)",
            "subtitle": "Korea Data Agency (K-DATA)"
          }
        ]
      },
      {
        "id": "awards",
        "type": "entries",
        "title": "Honors & Awards",
        "translation": "수상",
        "entries": [
          {
            "title": "Excellence Award · AI and Blockchain Business Model Competition",
            "subtitle": "AI-Centered University Project Group, Korea University"
          },
          {
            "title": "Encouragement Award · Summer Conference",
            "subtitle": "Korean Association of Data Science (KADS)"
          }
        ]
      },
      {
        "id": "skills",
        "type": "skills",
        "title": "Technical Skills",
        "translation": "기술",
        "rows": [
          {
            "label": "Programming",
            "value": "Python, R, Dart, SQL"
          },
          {
            "label": "Statistics & ML",
            "value": "SPSS, hypothesis testing (chi-square), logistic regression, C5.0 decision trees"
          },
          {
            "label": "Development",
            "value": "FastAPI, Flutter, Firebase"
          },
          {
            "label": "Databases & Tools",
            "value": "MySQL, GitHub"
          }
        ]
      }
    ]
  }
};
