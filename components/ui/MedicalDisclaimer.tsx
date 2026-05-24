import { MEDICAL_DISCLAIMER } from "@/lib/constants";

type MedicalDisclaimerProps = {
  variant?: "light" | "dark";
};

export default function MedicalDisclaimer({
  variant = "light",
}: MedicalDisclaimerProps) {
  const styles =
    variant === "dark"
      ? "border-white/20 bg-white/10 text-white/90"
      : "border-border-light bg-light-bg text-text-gray";

  return (
    <aside
      className={`flex flex-col gap-2 rounded-xl border px-5 py-4 text-sm leading-relaxed ${styles}`}
      aria-label="서비스 안내 주의사항"
    >
      {MEDICAL_DISCLAIMER.map((line) => (
        <p key={line} className="text-pretty">
          {line}
        </p>
      ))}
    </aside>
  );
}
