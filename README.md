## 💡 우아한 테크코스 프리코스 4, 5주차 오픈 미션

### 🎯 미션 주제명
**🌐 Frontend Portfolio – “도전에 몰입하는 개발자”**

### 🧩 개발 환경
|분야|기술|
|:---|:---|
|Frontend|`React`, `Typescript`, `Vite`|
|Library|`Lenis`, `Lottie`, `Swiper`, `formspree`|
|Styling| `CSS3`, `Tailwind CSS`, `Framer Motion`|
|Test|`Jest`, `React Testing Library`|
|Version Control|`Git`, `GitHub`|
|Deployment|`Vercel`|
|Design Tool|`Figma`|
<br>

- **프리코스에서 배운 언어 활용**: `Jest`<br>
- **새롭게 학습하고 적용한 기술**: `Tailwind CSS`, `formspree`, `React Testing Library`, `Lenis`, 'Lottie`

## 🎯 프로젝트를 시작하게 된 계기

우테코 프리코스를 진행하면서,
저는 단순히 코드를 작성하는 것을 넘어 **끊임없이 도전하고, 성장하는 개발자**가 되고 싶다는 목표를 가지게 되었습니다.

로또, 자동차 경주, 문자열 계산기 등 다양한 미션을 수행하며
처음 접하는 개념에 부딪히고, 수없이 시행착오를 겪었지만
그 과정 속에서 **문제를 해결하고, 함께 배우며 성장하는 즐거움** 을 알게 되었습니다.
이번 오픈 미션에서는 그동안의 여정을 한눈에 보여줄 수 있는 **포트폴리오 웹사이트**를 만들고자 합니다.

지금까지 프리코스에서 만든 프로젝트(로또, 자동차 경주, 문자열 계산기)와
실제 웹 제작 경험(GLYF, Myprotein 리디자인 등)을 하나의 공간에 담아,
제가 어떻게 지금까지 도전에 몰입하고 성장해 왔는지를 시각적으로 표현하려 합니다.

이 프로젝트는 단순한 자기소개 페이지가 아닌,
**“끊임없이 배우고 시도하며 성장하는 개발자”로서의 기록**이자,
우테코 프리코스의 핵심 가치인 **도전과 몰입**을 실천하는 제 방식입니다.

## 🚀 프로젝트를 통해 기대하는 성장
이번 미션의 목표는 단순히 포트폴리오를 **"만드는 것"**이 아니라,
**React 기반 프론트엔드 개발자로서 한 단계 더 성장하는 것**입니다.

### 🎨 기술적 목표
- `React + TypeScript`를 사용하여, 타입 안정성과 유지보수성을 갖춘 프로젝트 구조 설계
- 컴포넌트 기반 설계를 통해 UI를 효율적으로 재사용하고 관리
- 프리코스에서 배운 **테스트 코드(`Jest`, `React Testing Library`)**를 작성하여 안정적인 애플리케이션 구현
- React의 '관심사 분리(Separation of Concerns)' 원칙 적용
-   - `SkillInfo.tsx`와 같은 **컨테이너(Controller/Model)** 컴포넌트가 상태와 로직을 관리하고, `SkillBadge.tsx` 같은 **프리젠터(View)** 컴포넌트는 UI만 그리도록 설계하여 테스트가 용이한 구조 구현
- 반응형 디자인 & UI 완성도 향상을 통해 다양한 환경에서 일관된 사용자 경험 제공

### 💡 개인적 목표
- 프리코스 동안 겪었던 시행착오와 프리코스를 포함한 지금까지의 성장을 하나의 이야기로 시각화
- “몰입하는 개발자”로서의 태도와 열정을 보여주는 공간 구축
- 앞으로의 학습과 프로젝트들이 자연스럽게 이어질 수 있는 기반 마련
- 처음으로 프리코스에서 배운 `JEST`를 내 `React` 프로그램에 접목
- `Tailwind CSS`, `Framer Motion` 처럼 처음 써보는 기술로 스타일해보기, `JEST`외에 `React Testing Library`로도 테스트 도전

## 🧑‍💻 구체적인 실행 계획
|주차|주요 목표|상세 작업|
|:---|:---|:---|
|1주차|🔹 기획 & 기본 구조 설계|- 와이어프레임 / 페이지 구성 기획 (Figma)<br> - `React + Vite` 세팅<br> - 공통 UI 컴포넌트 제작<br> - 라우팅 설정|
|2주차|🔹 데이터 연결 & 배포| - `Github Pages or vercel`로 홈페이지 배포<br> - `JEST`로 테스트 코드 작성<br> - 스타일링 (Tailwind)|

## 📁 프로젝트 구조 (와이어프레임 완성)
```
portfolio/
├── node_modules/
│   └──  /...
├── public/
│   └── /...
├── src/
│   ├── Main.tsx
│   ├── App.tsx
│   ├── components/ # View: 재사용 UI
│   │   ├── common/ #공통 컴포넌트 관리
│   │   │   ├── Gnb.tsx: gnb 컴포넌트 
│   │   │   ├── Quickmenu.tsx: 퀵메뉴 컴포넌트
│   │   │   └── SideText.tsx: 사이드 라인, 문구 컴포넌트
│   │   └── layout/ #공통 틀 관리
│   ├── constants/ #메시지 상수 파일 폴더
│   │   ├── HyperLink.ts: 링크 관련 상수 메시지
│   │   ├── ImageInfo.ts: 이미지 관련 상수 메시지
│   │   └── Text.ts: 문장, 단어 등 상수 메시지
│   ├── images/
│   │   ├── icons/ #아이콘 이미지 모음
│   │   │   └── /...
│   │   └── pics/  #기타 이미지 모음
│   │   │   └── /...
│   ├── pages/  # View: 페이지 단위
│   │   ├──main/ # 메인페이지 컴포넌트 관리
│   │   │   ├── Title.tsx: 타이틀 컴포넌트
│   │   │   ├── ScrollFixedComponents.tsx: 스크롤 시 고정되는 공통컴포넌트들의 상위 컴포넌트
│   │   │   ├── Profile/ # Profile 페이지
│   │   │   │   ├──index.tsx: Profile 컴포넌트들의 최상위 컴포넌트
│   │   │   │   └──.../
│   │   │   ├── Skills/ # Skills 페이지
│   │   │   │   ├──index.tsx: Skills 컴포넌트들의 최상위 컴포넌트
│   │   │   │   └──.../
│   │   │   ├── Project/ # Skills 페이지
│   │   │   │   ├──index.tsx: Project 컴포넌트들의 최상위 컴포넌트
│   │   │   │   └──.../
│   │   │   ├── Contact/ # Contact 폼 제출 페이지
│   │   │   │   ├──index.tsx: Contact 컴포넌트의 최상위 컴포넌트
│   │   │   │   └──.../
│   │   └──sub/ # 서브페이지 컴포넌트 관리
│   ├── styles/ # View: 전역 스타일, Tailwind 설정
│   │   └── App.css: 공통 스타일 파일
│   ├── hooks/  # Controller: 로직/이벤트 제어
│   ├── utils/  # Model: 공용 로직, 데이터 가공
│   ├── store/  # Model: 전역 상태
│   └── tests/  # 테스트 코드 
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🧠 핵심 키워드
**도전/몰입/성장/기록**

## 🧠 피그마 작업물


## 🗓️ 개발 과정

- 2025-11-05 ~ 2025-11-07
- [x] 자료조사 및 와이어프레임 작성 (Figma 활용)

- 2025-11-08 ~ 2025-11-13 (와이어프레임, 반응형 설계, 스타일 다듬기)
- [x] 헤더 컴포넌트(타이틀) 코딩
- [x] 자기소개 컴포넌트 코딩
- [x] 스킬소개 컴포넌트 코딩
- [x] 프로젝트소개 컴포넌트 코딩
- [x] contact 컴포넌트 코딩 및 `formspree` 폼 제출 서비스 구독
- [x] 폰트, 색상 등의 디자인 설계 및 반응형 설계