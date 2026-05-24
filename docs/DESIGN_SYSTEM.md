# 오뚜기방문재활운동센터 디자인 시스템

> **구현 기준**: `app/globals.css`, `components/ui/formStyles.ts`  
> HTML 프로토타입과 다른 부분은 아래 **현재 구현** 값을 따릅니다.

## Color Palette

### Primary Colors

```css
--primary-blue: #5FA8D3;
--primary-navy: #2B3A4A;
--accent-green: #6B9080;
--accent-green-dark: #5a7e6f;
```

### Neutral Colors

```css
--light-bg: #F8F9FA;
--border-light: #E9ECEF;
--text-gray: #6C757D;
--text-dark: #1A1A1A;
```

### Tailwind (@theme in globals.css)

```css
--color-primary-blue: var(--primary-blue);
--color-primary-navy: var(--primary-navy);
--color-accent-green: var(--accent-green);
/* ... */
```

사용 예: `bg-primary-blue`, `text-primary-navy`, `border-border-light`

## Typography

- **Font**: Noto Sans KR (`next/font/google`, `app/layout.tsx`)
- Hero: `text-[1.6rem] md:text-5xl`
- Section title: `text-[1.6rem] md:text-[2.5rem]`
- Body: `text-base`
- `text-wrap: pretty` 권장

## Spacing & Layout

- 섹션 padding: `py-16 md:py-24`
- Container: `max-w-[1200px] mx-auto px-6`
- Booking inner: `max-w-[1000px]`
- Form row: `grid grid-cols-1 md:grid-cols-2 gap-4`

## Border Radius

- 버튼·input: `rounded-lg`
- 카드: `rounded-xl` ~ `rounded-2xl`

## Components

### Buttons

#### Primary CTA

```tsx
className="rounded-lg bg-primary-blue px-6 py-3 font-semibold text-white
           transition-all duration-300 hover:-translate-y-0.5
           hover:bg-primary-navy hover:shadow-[0_4px_12px_rgba(95,168,211,0.3)]"
```

#### Recruitment

```tsx
className="rounded-lg bg-accent-green px-10 py-3 font-semibold text-white
           hover:bg-accent-green-dark"
```

#### Kakao

```tsx
className="rounded-lg bg-[#FEE500] px-8 py-3 font-semibold text-[#3C1E1E]
           hover:bg-[#FDD800]"
```

### Cards

#### Program Card

```tsx
className="rounded-xl border-2 border-transparent bg-white p-8 shadow
           hover:-translate-y-1 hover:border-primary-blue"
```

#### Contact Card

```tsx
className="rounded-2xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]
           hover:-translate-y-1"
```

### Forms

스타일 상수: `components/ui/formStyles.ts`

```tsx
// input / select / textarea
" w-full rounded-lg border-2 border-border-light px-4 py-3
  focus:border-primary-blue focus:outline-none"
```

#### BirthDateInput (YYMMDD)

```tsx
// placeholder: "예: 550315 (YYMMDD)"
// inputMode="numeric", maxLength={6}
```

### Modal

#### Recruitment Modal (현재)

```tsx
// Overlay
"fixed inset-0 z-[2000] flex items-center justify-center bg-black/60"

// Content
"max-h-[90vh] w-[95%] max-w-[874px] overflow-y-auto rounded-2xl bg-white p-6 md:p-8"
```

#### Confirm Modal

```tsx
"mx-4 max-w-[500px] rounded-2xl bg-white p-8 text-center"
```

## Sections (현재 구현)

### Hero

```tsx
className="mt-[70px] bg-linear-to-br from-[#F0F7FA] to-[#E8F4F8] ..."
// 제목 text-primary-navy, CTA bg-primary-blue
```

### Process Steps

```tsx
// Step number
"w-[60px] h-[60px] rounded-full bg-primary-blue text-white"
```

### Recruitment Banner

```tsx
className="bg-linear-to-br from-accent-green to-accent-green-dark ..."
```

### Booking

```tsx
className="bg-linear-to-br from-primary-navy to-[#1A2832] text-white"
```

## Animations

```css
@keyframes slide-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down { animation: slide-down 0.3s ease; }
```

## Responsive Breakpoints

- `md`: 768px — 메뉴·그리드 2열
- `lg`: 1024px — 프로그램 3열

### Header

- md↓: 로고 50px, nav 가로 스크롤, 햄버거 없음
- md↑: 로고 80px

## Icons & Images

### Logo

- `public/assets/o-visit-care-logo.png`
- Next.js `Image`, `h-[50px] md:h-20 w-auto`
- 헤더 텍스트 라벨 없음 (`showText={false}`)

### Favicon

- `app/icon.png` (Next.js App Router)
- `public/favicon.png` (metadata `icons`)

### Contact Card Icons

- 이모지 사용 (📞 💬) — `text-[2.5rem] md:text-[4rem]`

## Accessibility

- Focus: `focus:border-primary-blue` (폼)
- Modal: `role="dialog"`, `aria-modal`, `aria-labelledby`
- 폼 오류: `aria-invalid`, `role="alert"`

## Code Style

Tailwind 클래스 순서: layout → box → typography → visual → transition

구현 파일과 문서 불일치 시 **코드 우선**.
