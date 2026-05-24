import SectionTitle from "@/components/ui/SectionTitle";
import {
  DIRECTOR_ACTIVITIES,
  DIRECTOR_CAREER,
  DIRECTOR_SPECIALTIES,
} from "@/lib/constants";

export default function DirectorProfile() {
  return (
    <section id="about" className="bg-light-bg px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle title="대표원장 소개" subtitle="함상민 원장" />

        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-primary-navy md:text-[2rem]">
              함상민
            </h3>
            <p className="mt-1 text-lg text-text-gray">원장</p>
            <div className="mt-4 flex flex-col gap-1">
              {DIRECTOR_SPECIALTIES.map((item) => (
                <p key={item} className="text-pretty text-[1.05rem] leading-relaxed">
                  ▪ {item}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t-2 border-border-light pt-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 border-b-2 border-primary-blue pb-2 text-xl font-semibold text-primary-navy">
                주요약력
              </h4>
              <ul className="flex flex-col gap-1">
                {DIRECTOR_CAREER.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 leading-8 before:absolute before:left-0 before:font-bold before:text-primary-blue before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 border-b-2 border-primary-blue pb-2 text-xl font-semibold text-primary-navy">
                주요활동
              </h4>
              <ul className="flex flex-col gap-1">
                {DIRECTOR_ACTIVITIES.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 leading-8 before:absolute before:left-0 before:font-bold before:text-primary-blue before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
