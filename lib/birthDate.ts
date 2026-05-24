const BIRTH_YEAR_MIN = 1940;

export function yyMmDdToIso(yymmdd: string): string | null {
  if (!/^\d{6}$/.test(yymmdd)) return null;

  const yy = Number(yymmdd.slice(0, 2));
  const mm = Number(yymmdd.slice(2, 4));
  const dd = Number(yymmdd.slice(4, 6));
  const year = yy >= 40 ? 1900 + yy : 2000 + yy;

  if (year < BIRTH_YEAR_MIN || year > new Date().getFullYear()) return null;
  if (mm < 1 || mm > 12 || dd < 1) return null;

  const date = new Date(year, mm - 1, dd);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    return null;
  }

  return `${year}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

export function validateYyMmDd(yymmdd: string): string | null {
  if (!yymmdd) return "생년월일 6자리를 입력해주세요.";
  if (!/^\d{6}$/.test(yymmdd)) {
    return "6자리 숫자로 입력해주세요. (예: 550315)";
  }
  if (!yyMmDdToIso(yymmdd)) {
    return "올바른 생년월일이 아닙니다. (예: 550315)";
  }
  return null;
}
