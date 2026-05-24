import { type ReactNode } from "react";

type ContactCardProps = {
  icon: string;
  title: string;
  time: string;
  description: string;
  children: ReactNode;
};

export default function ContactCard({
  icon,
  title,
  time,
  description,
  children,
}: ContactCardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4 text-[2.5rem] md:text-[4rem]" aria-hidden>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary-navy md:text-2xl">
        {title}
      </h3>
      <p className="mb-2 text-lg font-semibold text-primary-blue md:text-[1.3rem]">
        {time}
      </p>
      <p className="mb-6 text-pretty leading-relaxed text-text-gray md:text-base">
        {description}
      </p>
      {children}
    </div>
  );
}
