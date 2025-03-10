import Image from "next/image";
import StackedDevices from "./StackedDevices";

export default function PhoneTiltWork() {
  return (
    <>
      {/* Main content */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pt-10 pb-32 bg-black">
        <div className="w-full flex justify-evenly h-full">
        {/* max-w-7xl */}
          {/* Left column - Text content */}
          <div className="flex items-end justify-end w-1/2">
            <div className="flex flex-col items-center space-y-0 pt-10 w-4/5 h-2/3">
              {/* Primary heading */}
              <span className="flex items-center gap-0">
                <span className="text-4xl font-bold text-white">Enjoy</span>
                <Image
                  src="/email.svg"
                  width={100}
                  height={200}
                  alt=" "
                  className="opacity-100 animate-fadeIn"
                  style={{ animationDelay: "0.7s" }}
                />
                <span className="text-4xl font-bold text-white">
                  emails on mobile.
                </span>
              </span>

              {/* Secondary text */}
              <span className="flex items-center gap-0">
                <span className="text-4xl font-bold ">
                  {/* <AnimatedText text="Schedule" delay={1.1} faded={true} /> */}
                  Schedule
                </span>
                <Image src="/email-todos.svg" width={100} height={200} alt="" />
                <span className="text-4xl font-bold ">with drag</span>
              </span>

              {/* Tertiary text */}
              <span className="flex items-center gap-0">
                <span className="text-4xl font-bold ">and drop. </span>
                <span className="text-4xl font-bold ml-2">Made for you.</span>
              </span>
            </div>
          </div>

          {/* Right column - Device visualization */}
          <div className="relative flex justify-start w-2/5 items-start h-full">
            <div
              className={`transform transition-all duration-1000 opacity-100 translate-y-0 `}
            >
              <StackedDevices />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
