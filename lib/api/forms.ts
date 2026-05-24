import { postJson } from "@/lib/api/client";
import type {
  ConsultationPayload,
  RecruitmentPayload,
} from "@/lib/types/forms";

type SubmitResponse = { ok: true };

export function submitConsultation(data: ConsultationPayload) {
  return postJson<SubmitResponse>("/api/consultation", data);
}

export function submitRecruitment(data: RecruitmentPayload) {
  return postJson<SubmitResponse>("/api/recruitment", data);
}
