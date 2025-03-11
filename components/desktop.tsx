import { cn } from "@/lib/utils";

interface DesktopProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Desktop({ className, style = {}, children }: DesktopProps) {
  return (
    <div
      className={cn(
        "relative w-[45vw] h-[60vh] rounded-[40px] shadow-device",
        "flex flex-col items-center z-[60]",
        "device-3d",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transform:
          "perspective(1500px) rotateX(17.5deg) rotateY(0deg) rotateZ(0deg) translateZ(30px)",
          // "",
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
