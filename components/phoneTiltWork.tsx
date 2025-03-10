import Image from "next/image";
import StackedDevices from "./StackedDevices";

export default function PhoneTiltWork() {
  return (
    <>
      {/* Main content */}
      <main className="relative z-10 w-full flex flex-col items-center justify-center px-6 pt-10 pb-32">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-8 pt-10 order-2 lg:order-1">
            {/* Primary heading */}
            <span className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-medium text-white">
                Enjoy
              </span>
              <Image
                src="/email.svg"
                width={100}
                height={200}
                alt=" "
                className="opacity-100 animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
              />
              <span className="text-4xl md:text-5xl font-medium text-white">
                emails on mobile.
              </span>
            </span>

            {/* Secondary text */}
            <span className="space-y-2">
              <span className="text-3xl md:text-4xl font-medium">
                {/* <AnimatedText text="Schedule" delay={1.1} faded={true} /> */}
                Schedule
              </span>
              <Image src="/email-todos.svg" width={100} height={200} alt="" />
              <span className="text-3xl md:text-4xl font-medium">
                with drag and drop.
              </span>
            </span>

            {/* Tertiary text */}
            <span className="space-y-2">
              <span className="text-3xl md:text-4xl font-medium">
                Made for you.
              </span>
            </span>
          </div>

          {/* Right column - Device visualization */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
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
