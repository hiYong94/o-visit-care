import { NextResponse } from "next/server";
import { yyMmDdToIso } from "@/lib/birthDate";
import { notifyRecruitmentApplication } from "@/lib/slack/service";
import { SlackApiError } from "@/lib/slack/client";
import type { RecruitmentPayload } from "@/lib/types/forms";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseBody(body: unknown): RecruitmentPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;

  if (
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.birthDateYymmdd) ||
    !isNonEmptyString(data.gender) ||
    !isNonEmptyString(data.region) ||
    !isNonEmptyString(data.preferredLocation) ||
    !isNonEmptyString(data.phone)
  ) {
    return null;
  }

  const isoBirthdate = yyMmDdToIso(data.birthDateYymmdd);
  if (!isoBirthdate) return null;

  return {
    name: data.name.trim(),
    birthDate: isoBirthdate,
    birthDateYymmdd: data.birthDateYymmdd.trim(),
    gender: data.gender.trim(),
    region: data.region.trim(),
    preferredLocation: data.preferredLocation.trim(),
    phone: data.phone.trim(),
    experience: isNonEmptyString(data.experience)
      ? data.experience.trim()
      : undefined,
    certifications: isNonEmptyString(data.certifications)
      ? data.certifications.trim()
      : undefined,
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

    await notifyRecruitmentApplication(payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Recruitment API error:", error);

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
