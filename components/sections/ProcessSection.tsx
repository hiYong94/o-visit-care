import ProcessStep from "@/components/sections/ProcessStep";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-light-bg px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle title="이용 절차" subtitle="간편한 3단계로 시작하세요" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROCESS_STEPS.map((item) => (
            <ProcessStep key={item.step} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
