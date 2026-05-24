"use client";

import { useState } from "react";
import BookingSection from "@/components/booking/BookingSection";
import ConfirmModal from "@/components/booking/ConfirmModal";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DirectorProfile from "@/components/sections/DirectorProfile";
import Hero from "@/components/sections/Hero";
import ProcessSection from "@/components/sections/ProcessSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import RecruitmentBanner from "@/components/recruitment/RecruitmentBanner";
import RecruitmentModal from "@/components/recruitment/RecruitmentModal";

export default function HomePageClient() {
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recruitmentConfirmOpen, setRecruitmentConfirmOpen] = useState(false);
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);

  return (
    <>
      <Header onOpenRecruitment={() => setRecruitmentOpen(true)} />

      <main className="flex-1">
        <Hero />
        <ProgramsSection />
        <DirectorProfile />
        <ProcessSection />
        <RecruitmentBanner onOpenRecruitment={() => setRecruitmentOpen(true)} />
        <BookingSection
          phoneFormOpen={phoneFormOpen}
          onShowPhoneForm={() => setPhoneFormOpen(true)}
          onHidePhoneForm={() => setPhoneFormOpen(false)}
          onConsultationSuccess={() => setConfirmOpen(true)}
        />
      </main>

      <Footer />

      <RecruitmentModal
        open={recruitmentOpen}
        onClose={() => setRecruitmentOpen(false)}
        onSuccess={() => setRecruitmentConfirmOpen(true)}
      />
      <ConfirmModal
        open={confirmOpen}
        title="상담 신청 완료"
        message={"상담 신청이 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다."}
        onClose={() => setConfirmOpen(false)}
      />
      <ConfirmModal
        open={recruitmentConfirmOpen}
        title="지원서 접수 완료"
        message={
          "지원서가 접수되었습니다.\n담당자가 검토 후 연락드리겠습니다.\n감사합니다."
        }
        onClose={() => setRecruitmentConfirmOpen(false)}
      />
    </>
  );
}
