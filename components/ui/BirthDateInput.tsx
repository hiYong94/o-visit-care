"use client";

import { inputClassName } from "@/components/ui/formStyles";

type BirthDateInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export default function BirthDateInput({
  id = "patient_birthdate",
  value,
  onChange,
  error,
}: BirthDateInputProps) {
  const handleChange = (raw: string) => {
    onChange(raw.replace(/\D/g, "").slice(0, 6));
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        name="patient_birthdate_yymmdd"
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        maxLength={6}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="예: 550315 (YYMMDD)"
        className={`${inputClassName}${error ? " border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
