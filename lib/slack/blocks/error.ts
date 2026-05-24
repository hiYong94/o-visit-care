export type SubmissionErrorContext = {
  formType: "consultation" | "recruitment";
  errorMessage: string;
  errorName?: string;
  applicantName?: string;
  applicantPhone?: string;
};

const FORM_LABELS = {
  consultation: "재활운동 서비스 상담 신청",
  recruitment: "전문가 지원",
} as const;

function field(label: string, value: string) {
  return { type: "mrkdwn" as const, text: `*${label}*\n${value || "-"}` };
}

export function buildSubmissionErrorBlocks(context: SubmissionErrorContext) {
  const submittedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const blocks: unknown[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🚨 폼 제출 오류",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        field("폼 종류", FORM_LABELS[context.formType]),
        field("발생 시각", submittedAt),
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*오류 메시지*\n\`\`\`${context.errorMessage}\`\`\``,
      },
    },
  ];

  if (context.errorName) {
    blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `유형: \`${context.errorName}\``,
        },
      ],
    });
  }

  if (context.applicantName || context.applicantPhone) {
    blocks.push({
      type: "section",
      fields: [
        field("신청자 이름", context.applicantName ?? "-"),
        field("연락처", context.applicantPhone ?? "-"),
      ],
    });
  }

  const fallbackText = `[폼 제출 오류] ${FORM_LABELS[context.formType]} / ${context.errorMessage}`;

  return { blocks, text: fallbackText };
}
