"use client";

import { useEffect, useRef } from "react";
import ConsultationForm from "@/components/booking/ConsultationForm";
import ContactCard from "@/components/booking/ContactCard";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import { KAKAO_LINK, VISIT_ASSESSMENT_FREE_NOTE } from "@/lib/constants";

type BookingSectionProps = {
  phoneFormOpen: boolean;
  onShowPhoneForm: () => void;
  onHidePhoneForm: () => void;
  onConsultationSuccess: () => void;
};

export default function BookingSection({
  phoneFormOpen,
  onShowPhoneForm,
  onHidePhoneForm,
  onConsultationSuccess,
}: BookingSectionProps) {
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phoneFormOpen && formWrapperRef.current) {
      formWrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [phoneFormOpen]);

  return (
    <section
      id="booking"
      className="bg-linear-to-br from-primary-navy to-[#1A2832] px-6 py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-4 text-center text-[2rem] font-bold md:text-[2.5rem]">
          상담 신청
        </h2>
        <p className="mb-2 text-center text-lg opacity-90">
          편하신 방법으로 상담을 신청해주세요
        </p>
        <p className="mb-8 text-center text-base font-medium text-primary-blue">
          {VISIT_ASSESSMENT_FREE_NOTE}
        </p>

        <div className="mb-8">
          <MedicalDisclaimer variant="dark" />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ContactCard
            icon="📞"
            title="전화 상담 신청"
            time="평일 10:00 - 20:00"
            description="신청하시면 빠른 시일 내에 전화드립니다"
          >
            <button
              type="button"
              onClick={onShowPhoneForm}
              className="inline-block min-h-[44px] cursor-pointer rounded-lg bg-primary-blue px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-navy hover:shadow-[0_4px_12px_rgba(95,168,211,0.3)]"
            >
              전화 상담 신청
            </button>
          </ContactCard>

          <ContactCard
            icon="💬"
            title="카카오톡 상담"
            time="평일 09:00 - 20:00 | 주말 10:00 - 20:00"
            description="편한 시간에 채팅으로 상담받으세요"
          >
            <a
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block min-h-[44px] rounded-lg bg-[#FEE500] px-8 py-3 text-base font-semibold text-[#3C1E1E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FDD800] hover:shadow-[0_4px_12px_rgba(254,229,0,0.4)]"
            >
              카카오톡 상담하기
            </a>
          </ContactCard>
        </div>

        {phoneFormOpen && (
          <div ref={formWrapperRef} className="animate-slide-down">
            <ConsultationForm
              onCancel={onHidePhoneForm}
              onSuccess={() => {
                onHidePhoneForm();
                onConsultationSuccess();
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
