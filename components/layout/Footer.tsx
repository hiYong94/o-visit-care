import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary-navy px-6 py-8 text-center text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-wrap justify-around gap-6">
          <div>
            <h4 className="mb-2 text-primary-blue">{SITE_NAME}</h4>
            <p className="opacity-80">사업자등록번호: 000-00-00000</p>
            <p className="opacity-80">대표자명: 함상민</p>
          </div>
        </div>
        <p className="opacity-70">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
