type SlackPostMessageParams = {
  channel: string;
  blocks: unknown[];
  text: string;
};

type SlackApiResponse = {
  ok: boolean;
  error?: string;
};

export class SlackApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlackApiError";
  }
}

export async function postSlackMessage({
  channel,
  blocks,
  text,
}: SlackPostMessageParams): Promise<void> {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    throw new SlackApiError("SLACK_BOT_TOKEN is not configured");
  }

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ channel, blocks, text }),
  });

  if (!response.ok) {
    throw new SlackApiError(`Slack HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as SlackApiResponse;
  if (!data.ok) {
    throw new SlackApiError(data.error ?? "Unknown Slack API error");
  }
}
