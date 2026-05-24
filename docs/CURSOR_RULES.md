# Cursor Rules - 오뚜기방문재활운동센터 웹사이트

> **최종 업데이트**: Next.js 구현 반영 (2026)  
> HTML 프로토타입(`reference/index.html`)과 차이가 있으면 **코드가 우선**합니다.

## 프로젝트 개요

- **프로젝트명**: 오뚜기방문재활운동센터 웹사이트
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **패키지 관리**: npm
- **목적**: 방문 재활 서비스 소개, 상담 신청, 전문가 모집

## 브랜딩 가이드라인

### 브랜드명

- **한국어**: 오뚜기방문재활운동센터
- **영문**: O Visit Care

### 브랜드 에셋

| 용도 | 경로 |
|------|------|
| 로고·파비콘 | `public/assets/o-visit-care-logo.png` (통합 에셋) |
| 파비콘 (배포) | `app/icon.png`, `public/favicon.png` (동일 파일) |

- 헤더: 로고 이미지만 표시 (`Logo` `showText={false}`) — 이미지에 센터명 포함
- 크기: 모바일 50px · 데스크톱 80px 높이

### 연락처·외부 링크

코드에서 관리 (`lib/constants.ts`):

- `PHONE`, `EMAIL`, `KAKAO_LINK`, `SITE_NAME`

### 서비스 특징

- 원장(함상민)이 직접 재활 제공 (1인 운영)
- 창업 초기 — 과장·더미 콘텐츠 금지
- 보호자와 돌봄대상자 정보 명확히 구분

## 디자인 원칙

### 1. 콘텐츠

- No filler content
- 검증되지 않은 통계·수치 금지
- 실제 제공 서비스만 표시

### 2. AI 슬롭 회피

- 과도한 그라데이션, 불필요 이모지, 장식 SVG, Inter/Roboto 등 범용 폰트 지양

### 3. CSS

- Tailwind CSS 4 (`@import "tailwindcss"`, `@theme inline`)
- Flex/Grid + `gap`, `text-wrap: pretty`

### 4. 스케일

- 모바일 터치 영역 최소 44px

## 페이지 구조 (구현됨)

1. **Hero** — 재활, 집에서 편안하게
2. **프로그램** — 6종 (`lib/constants.ts` `PROGRAMS`)
3. **대표원장** — 함상민 원장
4. **이용절차** — 3단계
5. **전문가 모집 배너**
6. **상담 신청** — 전화 폼 + 카카오톡

조립: `components/HomePageClient.tsx`

## 운영 시간

- **전화 상담**: 평일 10:00 – 20:00
- **카카오톡**: 평일 09:00 – 20:00 | 주말 10:00 – 20:00

## 기능 요구사항

### 1. 전화 상담 신청 폼 (`ConsultationForm`)

**필수**

- 보호자 이름 · 보호자 연락처
- 돌봄대상자 성별 · 생년월일 (YYMMDD)
- 관심 프로그램 · 주소 (방문지역)
- 희망 통화 날짜 · 희망 통화 시간

**선택**

- 증상 및 문의사항

**희망 통화 시간 옵션**

- 오전 (10:00–12:00) · 오후 (13:00–17:00) · 저녁 (17:00–20:00) · **상관없음**

**Placeholder 예시**

- 이름 `예: 홍길동` · 연락처 `010-0000-0000` · 주소 `예: 서울시 강남구`
- 생년월일 `예: 550315 (YYMMDD)`

### 2. 생년월일 입력 (공통)

- 컴포넌트: `BirthDateInput`
- 로직: `lib/birthDate.ts`
- 6자리 숫자, `inputMode="numeric"`
- 세기 규칙: `40~99` → 19XX, `00~39` → 20XX
- 유효 범위: 1940년 ~ 현재 연도, 유효한 월·일
- 제출 데이터:
  - `patient_birthdate_yymmdd` / `birthDateYyMmDd` (원본 6자리)
  - `patient_birthdate` / `birthDate` (ISO `YYYY-MM-DD`)

### 3. 전문가 지원 모달 (`RecruitmentModal`)

**필수**: 성함, 생년월일(YYMMDD), 성별, 권역, 희망 근무지, 연락처  
**선택**: 연차 및 경력, 보유 자격증 (textarea 6줄)

**모달**

- 최대 너비 **874px**, `w-[95%]`
- X 버튼으로만 닫기 (배경 클릭 닫기 금지)
- 필드 1열, `gap-3`

### 4. GNB (`Header`)

- 프로그램 · 대표원장 · 이용절차 · 전문가 지원(녹색) · 상담 신청(CTA)
- scroll > 50px 시 shadow 강화
- 앵커 scroll 시 헤더 높이 70px 보정

## 반응형

### 데스크톱 (≥ 768px)

- 로고 80px, 가로 메뉴, CTA

### 모바일 (< 768px)

- 로고 50px (별도 텍스트 없음)
- 가로 스크롤 메뉴, **햄버거 금지**

### 소형 (< 480px)

- 폰트·아이콘 축소, 그리드 1열

## 컴포넌트 구조

```
components/
  home/
    HomePageClient.tsx    # 상태·페이지 조립
  layout/
    Header.tsx, Footer.tsx, Logo.tsx
  sections/
    Hero.tsx, ProgramsSection.tsx, ProgramCard.tsx
    DirectorProfile.tsx, ProcessSection.tsx, ProcessStep.tsx
  booking/
    BookingSection.tsx, ContactCard.tsx
    ConsultationForm.tsx, ConfirmModal.tsx
  recruitment/
    RecruitmentBanner.tsx, RecruitmentModal.tsx
  ui/
    BirthDateInput.tsx, FormGroup.tsx, FormRow.tsx
    SectionTitle.tsx, formStyles.ts
lib/
  constants.ts
  birthDate.ts
  scrollToSection.ts
```

## 데이터 처리

- 폼 제출: `console.log` → 확인 UI → 리셋
- 백엔드 연동 시 POST 엔드포인트 연결 예정
- 상태: React `useState` / `useEffect` (`HomePageClient`, 각 모달·폼)

## 접근성

- 이미지 `alt`, 버튼 `aria-label`, 폼 `label` 연결
- 생년월일 오류 `role="alert"`

## Git 커밋 컨벤션

```
feat: 새로운 기능
fix: 버그 수정
style: 디자인/스타일
refactor: 리팩토링
docs: 문서
chore: 빌드/설정
```

## 주의사항

1. 검증 안 된 통계, 미제공 서비스, 과장 마케팅 금지
2. 운영시간·연락처 변경 시 `lib/constants.ts` 및 UI 문구 동기화
3. 모달·폼: 데이터 손실 방지 (전문가 모달 배경 클릭 닫기 금지)
