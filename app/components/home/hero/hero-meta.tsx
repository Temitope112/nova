"use client";

import { useEffect, useState } from "react";

export function HeroTopMeta() {
  const [localTime, setLocalTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

      setLocalTime(time);
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="
        flex items-center justify-between
        border-b border-[#111820]/10
        py-4

        text-[9px]
        font-medium
        uppercase
        tracking-[0.2em]

        sm:py-5
        sm:text-[10px]
        lg:text-xs
      "
    >
      <span>NOVA / LOS</span>

      <span
        className="
          hidden
          text-[#111820]/40
          sm:block
        "
      >
        01 / Departure
      </span>

      <span className="text-[#111820]/50">
        Local time · {localTime}
      </span>
    </div>
  );
}

export function HeroBottomMeta() {
  return (
    <div
      className="
        relative z-20
        flex items-center justify-between
        py-5

        text-[8px]
        uppercase
        tracking-[0.18em]
        text-[#111820]/40

        sm:text-[10px]
        lg:text-xs
      "
    >
      <span>6°31′ N · 3°23′ E</span>

      <span>LOS · Nigeria</span>
    </div>
  );
}