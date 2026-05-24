import { CALL_TIME_OPTIONS, PROGRAMS } from "@/lib/constants";
import type { ConsultationPayload } from "@/lib/types/forms";

function programLabel(value: string) {
  return PROGRAMS.find((p) => p.value === value)?.title ?? value;
}

function timeLabel(value: string) {
  return CALL_TIME_OPTIONS.find((t) => t.value === value)?.label ?? value;
}

function field(label: string, value: string) {
  return { type: "mrkdwn" as const, text: `*${label}*\n${value || "-"}` };
}

export function buildConsultationBlocks(data: ConsultationPayload) {
  const submittedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🏠 재활운동 서비스 상담 신청",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        field("보호자 이름", data.name),
        field("보호자 연락처", data.phone),
      ],
    },
    {
      type: "section",
      fields: [
        field("돌봄대상자 성별", data.patientGender),
        field("돌봄대상자 생년월일", data.patientBirthdate),
      ],
    },
    {
      type: "section",
      fields: [
        field("관심 프로그램", programLabel(data.program)),
        field("방문지역", data.address),
      ],
    },
    {
      type: "section",
      fields: [
        field("희망 통화 날짜", data.preferredDate),
        field("희망 통화 시간", timeLabel(data.preferredTime)),
      ],
    },
  ];

  if (data.message?.trim()) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*증상 및 문의사항*\n${data.message.trim()}`,
      },
    });
  }

  blocks.push(
    { type: "divider" },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `접수: ${submittedAt} · YYMMDD: ${data.patientBirthdateYymmdd}`,
        },
      ],
    },
  );

  const fallbackText = `[상담 신청] ${data.name} / ${data.phone} / ${programLabel(data.program)}`;

  return { blocks, text: fallbackText };
}
