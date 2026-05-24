type ProgramCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function ProgramCard({
  icon,
  title,
  description,
}: ProgramCardProps) {
  return (
    <article className="rounded-xl border-2 border-transparent bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-blue hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-linear-to-br from-primary-blue to-accent-green text-[2rem]">
        {icon}
      </div>
      <h3 className="mb-4 text-xl font-semibold text-primary-navy md:text-2xl">
        {title}
      </h3>
      <p className="text-pretty leading-relaxed text-text-gray">{description}</p>
    </article>
  );
}
