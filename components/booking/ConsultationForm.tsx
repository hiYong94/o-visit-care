"use client";

import { type FormEvent, useRef, useState } from "react";
import FormGroup from "@/components/ui/FormGroup";
import FormRow from "@/components/ui/FormRow";
import BirthDateInput from "@/components/ui/BirthDateInput";
import PhoneInput from "@/components/ui/PhoneInput";
import {
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/ui/formStyles";
import { submitConsultation } from "@/lib/api/forms";
import { validateYyMmDd, yyMmDdToIso } from "@/lib/birthDate";
import { CALL_TIME_OPTIONS, CONSULTATION_PROGRAM_OPTIONS } from "@/lib/constants";
import { validatePreferredDate, getTodayDateString } from "@/lib/date";
import { validatePhone } from "@/lib/phone";
import { ApiError } from "@/lib/api/client";

type ConsultationFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ConsultationForm({
  onCancel,
  onSuccess,
}: ConsultationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const minPreferredDate = getTodayDateString();

  const resetForm = () => {
    formRef.current?.reset();
    setBirthDate("");
    setPhone("");
    setBirthDateError(null);
    setPhoneError(null);
    setDateError(null);
    setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const birthError = validateYyMmDd(birthDate);
    if (birthError) {
      setBirthDateError(birthError);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    const preferredDate = String(data.date);
    const dateValidationError = validatePreferredDate(preferredDate);
    if (dateValidationError) {
      setDateError(dateValidationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitConsultation({
        name: String(data.name),
        phone,
        patientGender: String(data.patient_gender),
        patientBirthdate: yyMmDdToIso(birthDate)!,
        patientBirthdateYymmdd: birthDate,
        program: String(data.program),
        address: String(data.address),
        preferredDate,
        preferredTime: String(data.time),
        message: data.message ? String(data.message) : undefined,
      });

      resetForm();
      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "신청 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 text-text-dark shadow-[0_8px_32px_rgba(0,0,0,0.2)] md:p-8"
    >
      <h3 className="mb-6 text-center text-xl font-bold text-primary-navy">
        전화 상담 신청서
      </h3>

      <div className="flex flex-col gap-6">
        <FormRow>
          <FormGroup label="보호자 이름" htmlFor="phone_name" required>
            <input
              id="phone_name"
              name="name"
              type="text"
              placeholder="예: 홍길동"
              required
              className={inputClassName}
            />
          </FormGroup>
          <FormGroup label="보호자 연락처" htmlFor="phone_contact" required>
            <PhoneInput
              id="phone_contact"
              name="phone"
              value={phone}
              required
              error={phoneError}
              onChange={(value) => {
                setPhone(value);
                if (phoneError) setPhoneError(null);
              }}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup label="돌봄대상자 성별" htmlFor="patient_gender" required>
            <select
              id="patient_gender"
              name="patient_gender"
              required
              className={selectClassName}
              defaultValue=""
            >
              <option value="" disabled>
                성별을 선택해주세요
              </option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </FormGroup>
          <FormGroup
            label="돌봄대상자 생년월일"
            htmlFor="patient_birthdate"
            required
          >
            <BirthDateInput
              value={birthDate}
              onChange={(value) => {
                setBirthDate(value);
                if (birthDateError) setBirthDateError(null);
              }}
              error={birthDateError}
            />
          </FormGroup>
        </FormRow>

        <FormGroup label="관심 프로그램" htmlFor="phone_program" required>
          <select
            id="phone_program"
            name="program"
            required
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              관심 프로그램을 선택해주세요
            </option>
            {CONSULTATION_PROGRAM_OPTIONS.map((program) => (
              <option key={program.value} value={program.value}>
                {program.title}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup label="주소 (방문지역)" htmlFor="phone_address" required>
          <input
            id="phone_address"
            name="address"
            type="text"
            placeholder="예: 서울시 강남구"
            required
            className={inputClassName}
          />
        </FormGroup>

        <FormRow>
          <FormGroup label="희망 통화 날짜" htmlFor="phone_date" required>
            <input
              id="phone_date"
              name="date"
              type="date"
              required
              min={minPreferredDate}
              className={`${inputClassName}${dateError ? " border-red-500 focus:border-red-500" : ""}`}
              aria-label="희망 통화 날짜"
              aria-invalid={!!dateError}
              aria-describedby={dateError ? "phone_date-error" : undefined}
              onChange={() => {
                if (dateError) setDateError(null);
              }}
            />
            {dateError && (
              <p id="phone_date-error" className="text-sm text-red-600" role="alert">
                {dateError}
              </p>
            )}
          </FormGroup>
          <FormGroup label="희망 통화 시간" htmlFor="phone_time" required>
            <select
              id="phone_time"
              name="time"
              required
              className={selectClassName}
              defaultValue=""
            >
              <option value="" disabled>
                통화 시간을 선택해주세요
              </option>
              {CALL_TIME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormGroup>
        </FormRow>

        <FormGroup label="증상 및 문의사항 (선택)" htmlFor="phone_message">
          <textarea
            id="phone_message"
            name="message"
            rows={4}
            placeholder="증상, 현재 상태, 궁금한 점 등을 자유롭게 작성해주세요"
            className={textareaClassName}
          />
        </FormGroup>

        {submitError && (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="min-h-[44px] flex-1 cursor-pointer rounded-lg bg-text-gray py-3 text-base font-semibold text-white transition-colors hover:bg-[#4B5563] disabled:cursor-not-allowed disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] flex-1 cursor-pointer rounded-lg bg-primary-blue py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-navy hover:shadow-[0_4px_12px_rgba(95,168,211,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "전송 중…" : "신청하기"}
          </button>
        </div>
      </div>
    </form>
  );
}
