type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
};

export default function ProcessStep({
  step,
  title,
  description,
}: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-blue text-2xl font-bold text-white">
        {step}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary-navy">{title}</h3>
      <p className="text-pretty text-text-gray">{description}</p>
    </div>
  );
}
