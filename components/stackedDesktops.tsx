import Desktop from "./desktop";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDesktops({
  count = 3,
  className = "",
}: StackedDevicesProps) {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${index === 1 ? 5 : 0}px`,
            left: `0px`,
            zIndex: count - index,
            // opacity: index === 0 ? 0 : 1,
            // backgroundColor: index === 0 ? "" : index === 1 ? "blue" : "pink"
           }}
        >
          <Desktop
            className={`shadow-xl ${
              index === 1 ? "border-none" : "border-white border-4"
            } ${index === 1 ? " h-[50vh]" : "h-[50.5vh]"}`}
            style={{
              opacity: `${index === 0 ? 0 : 1}`,
              transform: `perspective(1500px) 
                             rotateY(0}deg) 
                             rotateZ(${10 - index * 1}deg) 
                             translateZ(${30 - index * 5}px)`,
            }}
          >
            {index === 1 && (
              <>
                {/* Conditionally render videos based on currentProgression */}
                <div className="relative w-[20vw] h-[65vh] overflow-hidden">
                  {/* {renderVideo()} */}
                </div>
              </>
            )}
          </Desktop>
        </div>
      ))}
    </div>
  );
}
