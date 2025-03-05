import { Calendar } from "lucide-react";
import IconBox from "./IconBox";
import Image from "next/image";

export default function NotificationSummary() {
  return (
    <div className="animate-fade-in delay-300 mt-12">
      <p className="text-5xl font-light text-white/90 flex flex-wrap items-center justify-center">
        You got
        <IconBox className="mx-3">
          <div
            className="h-full bg-white rounded-sm p-[6px] box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex gap-[2px] items-center">
              <Image
                src="/avatar.png"
                fill
                alt="avatar"
                className="rounded-full size-3"
              />
              <div className="flex-grow flex gap-[2px] flex-col">
                <div className="rounded-full bg-black opacity-25 h-[5px]"></div>
                <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              </div>
            </div>
            <div className="mt-[6px] flex flex-col gap-[3px]">
              <div className="rounded-[2px] bg-black opacity-15 h-[20px]"></div>
              <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              <div className="rounded-full bg-black opacity-10 h-[3px]"></div>
              <div className="bg-white absolute inset-x-[6px] bottom-[4px] h-[8px] shadow-[0_0.5px_2px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.15)] rounded-[2px]"></div>
            </div>
          </div>
        </IconBox>
        2 emails and have
      </p>
      <p className="text-5xl font-light text-white/90 flex flex-wrap items-center justify-center">
        <IconBox className="mx-3 relative">
          <Calendar className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full"></span>
        </IconBox>
        2 meetings today.
      </p>
    </div>
  );
}
