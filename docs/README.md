# 프로젝트 문서

오뚜기방문재활운동센터 Next.js 웹사이트의 명세·디자인·참고 자료입니다.

## 문서 목록

| 파일 | 용도 | 비고 |
|------|------|------|
| [CURSOR_RULES.md](./CURSOR_RULES.md) | 기능 명세, 폼·모달, 컴포넌트 구조 | **현재 구현 반영** |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | 색상, 타이포, UI 패턴 | **현재 구현 반영** |
| [reference/index.html](./reference/index.html) | 초기 HTML 프로토타입 | 참고용, 코드와 차이 있음 |

## 구현 vs 프로토타입

HTML 프로토타입은 기획·디자인 초안입니다. 아래는 **코드에만 반영된** 주요 차이입니다.

| 항목 | 프로토타입 | 현재 구현 |
|------|-----------|-----------|
| 생년월일 | `type="date"` | **YYMMDD** 6자리 (`BirthDateInput`) |
| 희망 통화 시간 | 3옵션 | **상관없음** 추가 |
| 상담 폼 필수 | 통화 날짜/시간 선택 | **모두 필수** (증상만 선택) |
| 전문가 모달 너비 | 1560px | **874px** |
| 로고 | 이미지 + 텍스트 | **이미지만** (워드마크 내장) |
| 파비콘 | 별도 파일 | **`o-visit-care-logo.png` 통합** |
| 프레임워크 | 정적 HTML | **Next.js 16** App Router |

## Cursor Rules (`.cursor/rules/`)

| 규칙 | 적용 |
|------|------|
| `project-context.mdc` | 항상 — 브랜드, 기능, YYMMDD, 에셋 |
| `design-system.mdc` | `*.tsx`, `*.css` |
| `ui-reference.mdc` | `*.tsx`, `*.ts` — 컴포넌트 매핑 |

`docs/`와 `.cursor/rules/`는 함께 유지합니다. 기능 변경 시 두 곳 모두 갱신하는 것을 권장합니다.

## 소스 코드 핵심 경로

```
app/                    # layout, page, globals.css, icon.png
components/
  home/                 # HomePageClient
  layout/               # Header, Footer, Logo
  sections/             # Hero, Programs, Director, Process
  booking/              # 상담 신청, 폼, ConfirmModal
  recruitment/          # 전문가 모집 배너·모달
  ui/                   # 공통 UI
lib/constants.ts
lib/birthDate.ts
public/assets/o-visit-care-logo.png
```

## 실행

```bash
npm install
npm run dev   # http://localhost:3000
```
