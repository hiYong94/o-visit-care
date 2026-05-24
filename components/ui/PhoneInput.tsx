"use client";

import { inputClassName } from "@/components/ui/formStyles";
import { formatPhoneInput } from "@/lib/phone";

type PhoneInputProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  required?: boolean;
};

export default function PhoneInput({
  id = "phone",
  name = "phone",
  value,
  onChange,
  error,
  required,
}: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="010-0000-0000"
        maxLength={13}
        value={value}
        required={required}
        onChange={(e) => onChange(formatPhoneInput(e.target.value))}
        className={`${inputClassName}${error ? " border-red-500 focus:border-red-500" : ""}`}
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
