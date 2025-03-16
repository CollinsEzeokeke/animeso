"use client";
import { useState, useEffect } from "react";
import IconBox from "./IconBox";
import { format } from "date-fns";
import Image from "next/image";

export default function DailyStatus() {
  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDay(format(now, "EEEE"));
      setCurrentTime(format(now, "h:mm a"));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-6xl font-semibold tracking-wide mb-3 text-slate-50/85">
        Happy {currentDay}!
      </h1>
      <p className="text-6xl font-bold text-slate-100 flex items-center justify-center">
        <span className="text-slate-50/90 text-6xl"> It&apos;s </span>
        <IconBox className="mx-2">
          <Image
            src="/feature-pomodoro.webp"
            width={100}
            height={300}
            className="w-full h-full"
            alt="clock"
          />
        </IconBox>{" "}
        {currentTime}
        <span className="text-slate-50/90 pl-2 text-6xl ml-2"> and</span>{" "}
        <IconBox className="mx-3">
          <Image
            src="/cloud-high.png"
            alt="cloud-image"
            width={70}
            height={70}
          />
        </IconBox>{" "}
        mostly clear
      </p>
    </div>
  );
}
