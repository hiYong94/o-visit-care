import { postSlackMessage } from "@/lib/slack/client";
import { SLACK_CHANNELS } from "@/lib/slack/channels";
import { buildConsultationBlocks } from "@/lib/slack/blocks/consultation";
import { buildRecruitmentBlocks } from "@/lib/slack/blocks/recruitment";
import type {
  ConsultationPayload,
  RecruitmentPayload,
} from "@/lib/types/forms";

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
