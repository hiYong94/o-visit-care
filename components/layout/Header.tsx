"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/layout/Logo";
import { scrollToSection } from "@/lib/scrollToSection";

type HeaderProps = {
  onOpenRecruitment: () => void;
};

const navItems = [
  { id: "programs", label: "프로그램" },
  { id: "about", label: "대표원장" },
  { id: "process", label: "이용절차" },
] as const;

export default function Header({ onOpenRecruitment }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.1)]" : "shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-8 md:py-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0 cursor-pointer border-none bg-transparent p-0"
          aria-label="홈으로 이동"
        >
          <Logo showText={false} />
        </button>

        <ul className="flex flex-1 items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center md:gap-6 [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer whitespace-nowrap px-2 py-1 text-sm font-medium text-text-dark transition-colors hover:text-primary-blue md:px-0 md:text-base"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="shrink-0">
            <button
              type="button"
              onClick={onOpenRecruitment}
              className="cursor-pointer whitespace-nowrap px-2 py-1 text-sm font-semibold text-accent-green transition-colors hover:text-accent-green-dark md:px-0 md:text-base"
            >
              전문가 지원
            </button>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => scrollToSection("booking")}
          className="shrink-0 cursor-pointer rounded-lg bg-primary-blue px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-navy hover:shadow-[0_4px_12px_rgba(95,168,211,0.3)] md:px-6 md:py-3 md:text-base"
        >
          상담 신청
        </button>
      </nav>
    </header>
  );
}
