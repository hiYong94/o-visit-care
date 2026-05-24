const SEOUL_TZ = "Asia/Seoul";

export function getTodayDateString(timeZone = SEOUL_TZ): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

export function isDateOnOrAfterToday(date: string, timeZone = SEOUL_TZ): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return date >= getTodayDateString(timeZone);
}

export function validatePreferredDate(date: string): string | null {
  if (!date) return "희망 통화 날짜를 선택해주세요.";
  if (!isDateOnOrAfterToday(date)) {
    return "오늘 이후 날짜를 선택해주세요.";
  }
  return null;
}
