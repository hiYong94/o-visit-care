import { type ReactNode } from "react";

type FormRowProps = {
  children: ReactNode;
};

export default function FormRow({ children }: FormRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}
