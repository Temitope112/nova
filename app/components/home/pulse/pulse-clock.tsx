"use client";

import {
  useEffect,
  useState,
} from "react";

export default function PulseClock() {
  const [time, setTime] =
    useState<string>("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      const formatter =
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

      setTime(formatter.format(new Date()));
    };

    updateTime();

    const interval =
      window.setInterval(updateTime, 1000);

    return () =>
      window.clearInterval(interval);
  }, []);

  return (
    <time
      className="
        font-mono

        text-[clamp(2rem,4vw,4rem)]
        leading-none
        tracking-[-0.05em]
      "
    >
      {time}
    </time>
  );
}