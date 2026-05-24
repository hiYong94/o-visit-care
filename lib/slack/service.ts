import { postSlackMessage } from "@/lib/slack/client";
import { SLACK_CHANNELS } from "@/lib/slack/channels";
import { buildConsultationBlocks } from "@/lib/slack/blocks/consultation";
import { buildRecruitmentBlocks } from "@/lib/slack/blocks/recruitment";
import {
  buildSubmissionErrorBlocks,
  type SubmissionErrorContext,
} from "@/lib/slack/blocks/error";
import type {
  ConsultationPayload,
  RecruitmentPayload,
} from "@/lib/types/forms";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function getErrorName(error: unknown): string | undefined {
  if (error instanceof Error && error.name) return error.name;
  return undefined;
}

export function buildSubmissionErrorContext(
  formType: SubmissionErrorContext["formType"],
  error: unknown,
  payload?: ConsultationPayload | RecruitmentPayload,
): SubmissionErrorContext {
  const context: SubmissionErrorContext = {
    formType,
    errorMessage: getErrorMessage(error),
    errorName: getErrorName(error),
  };

  if (!payload) return context;

  return {
    ...context,
    applicantName: payload.name,
    applicantPhone: payload.phone,
  };
}

export async function notifySubmissionError(
  context: SubmissionErrorContext,
): Promise<void> {
  try {
    const { blocks, text } = buildSubmissionErrorBlocks(context);
    await postSlackMessage({
      channel: SLACK_CHANNELS.service,
      blocks,
      text,
    });
  } catch (monitorError) {
    console.error("Failed to send submission error alert to Slack:", monitorError);
  }
}

export async function notifyConsultationRequest(
  data: ConsultationPayload,
): Promise<void> {
  const { blocks, text } = buildConsultationBlocks(data);
  await postSlackMessage({
    channel: SLACK_CHANNELS.service,
    blocks,
    text,
  });
}

export async function notifyRecruitmentApplication(
  data: RecruitmentPayload,
): Promise<void> {
  const { blocks, text } = buildRecruitmentBlocks(data);
  await postSlackMessage({
    channel: SLACK_CHANNELS.caregiver,
    blocks,
    text,
  });
}
