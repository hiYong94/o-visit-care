import { type ReactNode } from "react";

type FormGroupProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
};

export default function FormGroup({
  label,
  htmlFor,
  required,
  children,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-text-dark"
      >
        {label}
        {required && " *"}
      </label>
      {children}
    </div>
  );
}
