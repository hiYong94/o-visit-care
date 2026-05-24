type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-2 text-[1.6rem] font-bold text-primary-navy md:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-text-gray md:text-[1.2rem]">{subtitle}</p>
      )}
    </div>
  );
}
