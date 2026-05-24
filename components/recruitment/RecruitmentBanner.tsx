type RecruitmentBannerProps = {
  onOpenRecruitment: () => void;
};

export default function RecruitmentBanner({
  onOpenRecruitment,
}: RecruitmentBannerProps) {
  return (
    <section className="bg-linear-to-br from-accent-green to-accent-green-dark px-6 py-8 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="mb-2 text-xl font-bold md:text-[1.8rem]">
            함께할 재활 전문가를 찾습니다
          </h2>
          <p className="text-base opacity-90 md:text-lg">
            환자 중심의 가치를 함께 실현할 물리치료사, 작업치료사를 모집합니다
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenRecruitment}
          className="shrink-0 cursor-pointer rounded-lg bg-white px-8 py-3 text-base font-semibold text-accent-green transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[0_4px_12px_rgba(255,255,255,0.3)] md:px-10 md:py-3.5 md:text-lg"
        >
          전문가 지원하기
        </button>
      </div>
    </section>
  );
}
