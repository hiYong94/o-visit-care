# 오뚜기방문재활운동센터

방문 재활 센터 웹 서비스입니다.

## 기술 스택

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |

## 프로젝트 구조

```
app/
  layout.tsx    # 루트 레이아웃, 메타데이터
  page.tsx      # 메인 랜딩 페이지
  globals.css   # Tailwind CSS 및 전역 스타일
components/
  Header.tsx    # 헤더 네비게이션
  Footer.tsx    # 푸터
```
