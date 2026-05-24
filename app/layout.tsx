import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "오뚜기방문재활운동센터 - 재활, 집에서 편안하게",
  description:
    "오뚜기방문재활운동센터 - 전문 재활운동 서비스가 당신의 집으로 찾아갑니다",
  keywords: [
    "방문재활",
    "재활운동",
    "방문물리치료",
    "오뚜기방문재활운동센터",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
