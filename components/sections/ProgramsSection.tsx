import ProgramCard from "@/components/sections/ProgramCard";
import MedicalDisclaimer from "@/components/ui/MedicalDisclaimer";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROGRAMS } from "@/lib/constants";

export default function ProgramsSection() {
  return (
    <section id="programs" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          title="재활 프로그램"
          subtitle="개인별 맞춤 솔루션을 제공합니다"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.value} {...program} />
          ))}
        </div>
        <div className="mt-10">
          <MedicalDisclaimer />
        </div>
      </div>
    </section>
  );
}
