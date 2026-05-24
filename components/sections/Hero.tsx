"use client";

import { scrollToSection } from "@/lib/scrollToSection";

const features = [
  "1:1 맞춤 재활 프로그램",
  "전문 물리치료사 방문",
  "편안한 집에서 진행",
];

export default function Hero() {
  return (
    <section className="mt-[70px] bg-linear-to-br from-[#F0F7FA] to-[#E8F4F8] px-6 py-16 text-center md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-4 text-[1.6rem] font-bold leading-tight text-primary-navy md:text-5xl">
          재활, 집에서 편안하게
        </h1>
        <p className="mb-8 text-base text-text-gray md:text-2xl">
          전문 재활운동 서비스가 당신의 집으로 찾아갑니다
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("booking")}
          className="inline-block cursor-pointer rounded-lg bg-primary-blue px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-navy hover:shadow-[0_4px_12px_rgba(95,168,211,0.3)]"
        >
          무료 상담 신청
        </button>

        <div className="mt-12 flex flex-col items-start justify-center gap-4 md:flex-row md:items-center md:gap-12">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-base text-text-dark md:text-lg"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-green text-sm font-bold text-white">
                ✓
              </span>
              <span className="text-pretty">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
