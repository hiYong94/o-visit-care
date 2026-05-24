export const SLACK_CHANNELS = {
  service: process.env.SLACK_CHANNEL_SERVICE ?? "C0B5T7UDMFG",
  caregiver: process.env.SLACK_CHANNEL_CAREGIVER ?? "C0B5NUBM5AP",
} as const;
