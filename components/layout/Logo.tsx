"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";

type LogoProps = {
  showText?: boolean;
};

export default function Logo({ showText = true }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {!hasError ? (
        <Image
          src="/assets/o-visit-care-logo.png"
          alt={SITE_NAME}
          width={500}
          height={499}
          className="h-[50px] w-auto drop-shadow-sm md:h-20"
          onError={() => setHasError(true)}
          priority
        />
      ) : (
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-primary-blue text-lg font-bold text-white md:h-20 md:w-20 md:text-2xl"
          aria-hidden
        >
          오
        </div>
      )}
      {showText && (
        <span className="hidden text-[1.4rem] font-bold tracking-tight text-primary-navy md:inline">
          {SITE_NAME}
        </span>
      )}
    </div>
  );
}
