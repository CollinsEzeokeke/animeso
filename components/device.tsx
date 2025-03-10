import { cn } from "@/lib/utils";

interface DeviceProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Device({ className, style = {}, children }: DeviceProps) {
  return (
    <div
      className={cn(
        "relative w-[20vw] bg-white rounded-[40px] shadow-device",
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
      {/* Screen content */}
      <div
        className="absolute inset-2 rounded-[35px] flex items-center justify-center overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(1px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
