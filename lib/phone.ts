export const PHONE_PATTERN = /^\d{3}-\d{4}-\d{4}$/;

export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return "연락처를 입력해주세요.";
  if (!PHONE_PATTERN.test(trimmed)) {
    return "연락처 형식이 올바르지 않습니다. (예: 010-0000-0000)";
  }
  return null;
}

export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone.trim());
}
