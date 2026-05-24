"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import FormGroup from "@/components/ui/FormGroup";
import BirthDateInput from "@/components/ui/BirthDateInput";
import {
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/ui/formStyles";
import { validateYyMmDd, yyMmDdToIso } from "@/lib/birthDate";
import { REGIONS } from "@/lib/constants";

type RecruitmentModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RecruitmentModal({
  open,
  onClose,
}: RecruitmentModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setBirthDate("");
      setBirthDateError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const birthError = validateYyMmDd(birthDate);
    if (birthError) {
      setBirthDateError(birthError);
      return;
    }

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("applicantName") as HTMLInputElement).value,
      birthDate: yyMmDdToIso(birthDate),
      birthDateYyMmDd: birthDate,
      gender: (form.elements.namedItem("gender") as HTMLSelectElement).value,
      region: (form.elements.namedItem("region") as HTMLSelectElement).value,
      preferredLocation: (
        form.elements.namedItem("preferredLocation") as HTMLInputElement
      ).value,
      phone: (form.elements.namedItem("applicantPhone") as HTMLInputElement)
        .value,
      experience: (form.elements.namedItem("experience") as HTMLTextAreaElement)
        .value,
      certifications: (
        form.elements.namedItem("certifications") as HTMLTextAreaElement
      ).value,
    };
    console.log("전문가 지원 데이터:", data);
    alert(
      "지원서가 접수되었습니다.\n담당자가 검토 후 연락드리겠습니다.\n감사합니다.",
    );
    formRef.current?.reset();
    setBirthDate("");
    setBirthDateError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruitment-modal-title"
    >
      <div
        className="max-h-[90vh] w-[95%] max-w-[874px] overflow-y-auto rounded-2xl bg-white p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <h2
            id="recruitment-modal-title"
            className="text-2xl font-bold text-primary-navy"
          >
            전문가 지원
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-0 right-0 cursor-pointer border-none bg-transparent text-2xl font-bold leading-none text-text-gray transition-colors hover:text-primary-navy"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <FormGroup label="성함" htmlFor="applicantName" required>
            <input
              id="applicantName"
              name="applicantName"
              type="text"
              required
              className={inputClassName}
            />
          </FormGroup>

          <FormGroup label="생년월일" htmlFor="birthDate" required>
            <BirthDateInput
              id="birthDate"
              value={birthDate}
              onChange={(value) => {
                setBirthDate(value);
                if (birthDateError) setBirthDateError(null);
              }}
              error={birthDateError}
            />
          </FormGroup>

          <FormGroup label="성별" htmlFor="gender" required>
            <select
              id="gender"
              name="gender"
              required
              className={selectClassName}
              defaultValue=""
            >
              <option value="" disabled>
                선택해주세요
              </option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </FormGroup>

          <FormGroup label="권역" htmlFor="region" required>
            <select
              id="region"
              name="region"
              required
              className={selectClassName}
              defaultValue=""
            >
              <option value="" disabled>
                선택해주세요
              </option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup label="희망 근무지" htmlFor="preferredLocation" required>
            <input
              id="preferredLocation"
              name="preferredLocation"
              type="text"
              placeholder="예: 서울시 강남구"
              required
              className={inputClassName}
            />
          </FormGroup>

          <FormGroup label="연락처" htmlFor="applicantPhone" required>
            <input
              id="applicantPhone"
              name="applicantPhone"
              type="tel"
              placeholder="010-0000-0000"
              required
              className={inputClassName}
            />
          </FormGroup>

          <FormGroup label="연차 및 경력" htmlFor="experience">
            <textarea
              id="experience"
              name="experience"
              rows={6}
              placeholder="예: 물리치료사 5년차, ○○병원 재활의학과 3년 근무"
              className={textareaClassName}
            />
          </FormGroup>

          <FormGroup label="보유 자격증" htmlFor="certifications">
            <textarea
              id="certifications"
              name="certifications"
              rows={6}
              placeholder="예: 물리치료사 면허, 도수치료 자격증, 신경계물리치료 전문과정 수료"
              className={textareaClassName}
            />
          </FormGroup>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="min-h-[44px] cursor-pointer rounded-lg bg-accent-green px-10 py-3 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-green-dark hover:shadow-[0_4px_12px_rgba(107,144,128,0.3)]"
            >
              지원서 제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
