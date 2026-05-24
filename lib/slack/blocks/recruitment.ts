import type { RecruitmentPayload } from "@/lib/types/forms";

function field(label: string, value: string) {
  return { type: "mrkdwn" as const, text: `*${label}*\n${value || "-"}` };
}

export function buildRecruitmentBlocks(data: RecruitmentPayload) {
  const submittedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "👩‍⚕️ 전문가 지원",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        field("성함", data.name),
        field("연락처", data.phone),
      ],
    },
    {
      type: "section",
      fields: [
        field("생년월일", data.birthDate),
        field("성별", data.gender),
      ],
    },
    {
      type: "section",
      fields: [
        field("권역", data.region),
        field("희망 근무지", data.preferredLocation),
      ],
    },
  ];

  if (data.experience?.trim()) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*연차 및 경력*\n${data.experience.trim()}`,
      },
    });
  }

  if (data.certifications?.trim()) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*보유 자격증*\n${data.certifications.trim()}`,
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
          text: `접수: ${submittedAt} · YYMMDD: ${data.birthDateYymmdd}`,
        },
      ],
    },
  );

  const fallbackText = `[전문가 지원] ${data.name} / ${data.phone} / ${data.region}`;

  return { blocks, text: fallbackText };
}
