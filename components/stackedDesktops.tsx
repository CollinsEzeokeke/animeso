import { useThirdScrollOverlay } from "@/hooks/store/store";
import Desktop from "./desktop";
import Image from "next/image";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDesktops({
  count = 3,
  className = "",
}: StackedDevicesProps) {
  const { thirdScrollProgress } = useThirdScrollOverlay();
  const renderVideo = () => {
    if (thirdScrollProgress >= 0.99) {
      return (
        <div className="relative h-full w-full">
          <video
            src="/mailTodos.mp4"
            className="w-full h-full object-contain translate-y-3 scale-y-full"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute bottom-0 z-[60] h-[18%] w-1/2 left-1/2 -translate-x-full flex items-center -translate-y-full">
            <Image
              src="/stamponvideo.webp"
              alt="mailTodos"
              width={50}
              height={50}
            />
          </div>
        </div>
      );
    } else if (thirdScrollProgress >= 0.7933) {
      return (
        <video
          src="/three.mp4"
          className="w-full h-full object-contain translate-y-3 scale-y-full"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    } else if (thirdScrollProgress >= 0.5967) {
      return (
        <video
          src="/two.mp4"
          className="w-full h-full object-contain translate-y-3 scale-y-full"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    } else if (thirdScrollProgress >= 0.4) {
      return (
        <video
          src="/one.mp4"
          className="w-full h-full object-contain translate-y-3 scale-y-full"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    } else {
      // Default nothing if not in the right range
      return " ";
    }
  };
  
  return (
    <div className={`relative h-[70%] w-[50%] -translate-x-11 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute h-full"
          style={{
            top: `${index === 1 ? 5 : 10}px`,
            left: "0px",
            zIndex: count - index,
          }}
        >
          <Desktop
            className={`shadow-xl ${
              index === 1 ? "border-none" : "border-none border-4"
            } ${index === 1 ? " h-[55vh]" : "h-[55.5vh]"} ${
              index === 1 ? "bg-transparent" : "bg-white"
            } ${index === 0 && "bg-transparent"}`}
          >
            {index === 1 && (
              <>
                {/* Conditionally render videos based on currentProgression */}
                <div className="relative w-[45vw] h-full overflow-hidden">
                  {renderVideo()}
                </div>
              </>
            )}
          </Desktop>
        </div>
      ))}
    </div>
  );
}
