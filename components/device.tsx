import { cn } from "@/lib/utils";

interface DeviceProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Device({ className, style = {} }: DeviceProps) {
  return (
    <div
      className={cn(
        "relative w-72 h-[570px] bg-white rounded-[40px] shadow-device border-black border-4",
        "flex flex-col items-center",
        "device-3d",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transform:
          "perspective(1500px) rotateX(0deg) rotateY(-50deg) rotateZ(10deg) translateZ(30px)",
        ...style,
      }}
    >
      {/* Phone notch */}
      <div className="w-32 h-6 bg-black rounded-b-xl absolute top-0 left-1/2 transform -translate-x-1/2" />

      {/* Home indicator */}
      <div className="w-32 h-1 bg-black rounded-full absolute bottom-2 left-1/2 transform -translate-x-1/2" />

      {/* Screen content - keep empty for simplicity */}
      <div
        className="absolute inset-2 rounded-[35px] bg-gray-50 flex items-center justify-center overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(1px)",
        }}
      >
        {/* Empty screen content */}
      </div>
    </div>
  );
}
