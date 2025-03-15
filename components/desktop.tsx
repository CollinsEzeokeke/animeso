import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface DesktopProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Desktop({ className, style = {}, children }: DesktopProps) {
  // Memoize the class name to prevent recalculation on each render
  const combinedClassName = useMemo(() => 
    cn(
      "relative w-[45vw] h-[200vh] rounded-[40px] shadow-device",
      "flex flex-col items-center z-[60]",
      "device-3d",
      className
    ), 
    [className]
  );

  // Memoize the combined style to prevent recalculation
  const combinedStyle = useMemo(() => {
    // Create a new style object with transformed properties
    const newStyle: React.CSSProperties = {
      // Type-safe properties
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      transform:
        "perspective(1500px) rotateX(17.5deg) rotateY(0deg) rotateZ(0deg) translateZ(30px)",
      // Spread the rest of the style props
      ...style,
    };
    
    // Only add willChange if a transform exists
    if (style.transform) {
      newStyle.willChange = "transform";
    } else {
      // Add default willChange for the base transform
      newStyle.willChange = "transform";
    }
    
    return newStyle;
  }, [style]);

  // Memoize the screen content style
  const screenStyle = useMemo(() => {
    const style: React.CSSProperties = {
      transformStyle: "preserve-3d",
      transform: "translateZ(1px)",
    };
    return style;
  }, []);

  return (
    <div
      className={combinedClassName}
      style={combinedStyle}
    >
      {/* Screen content */}
      <div
        className="absolute inset-2 rounded-[35px] flex items-center justify-center overflow-hidden"
        style={screenStyle}
      >
        {children}
      </div>
    </div>
  );
}
