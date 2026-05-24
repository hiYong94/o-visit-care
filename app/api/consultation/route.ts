import { NextResponse } from "next/server";
import { yyMmDdToIso } from "@/lib/birthDate";
import { CONSULTATION_PROGRAM_OPTIONS } from "@/lib/constants";
import { isValidPhone } from "@/lib/phone";
import { isDateOnOrAfterToday } from "@/lib/date";
import { notifyConsultationRequest } from "@/lib/slack/service";
import { SlackApiError } from "@/lib/slack/client";
import type { ConsultationPayload } from "@/lib/types/forms";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseBody(body: unknown): ConsultationPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;

  if (
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.phone) ||
    !isNonEmptyString(data.patientGender) ||
    !isNonEmptyString(data.patientBirthdateYymmdd) ||
    !isNonEmptyString(data.program) ||
    !isNonEmptyString(data.address) ||
    !isNonEmptyString(data.preferredDate) ||
    !isNonEmptyString(data.preferredTime)
  ) {
    return null;
  }

  const isoBirthdate = yyMmDdToIso(data.patientBirthdateYymmdd);
  if (!isoBirthdate) return null;

  const program = data.program.trim();
  const isValidProgram = CONSULTATION_PROGRAM_OPTIONS.some(
    (option) => option.value === program,
  );
  if (!isValidProgram || !isValidPhone(data.phone)) return null;

  const preferredDate = data.preferredDate.trim();
  if (!isDateOnOrAfterToday(preferredDate)) return null;

  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    patientGender: data.patientGender.trim(),
    patientBirthdate: isoBirthdate,
    patientBirthdateYymmdd: data.patientBirthdateYymmdd.trim(),
    program,
    address: data.address.trim(),
    preferredDate,
    preferredTime: data.preferredTime.trim(),
    message: isNonEmptyString(data.message) ? data.message.trim() : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseBody(body);

    if (!payload) {
      return NextResponse.json(
        { error: "필수 항목을 확인해주세요." },
        { status: 400 },
      );
    }

    await notifyConsultationRequest(payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation API error:", error);

    if (error instanceof SlackApiError) {
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
