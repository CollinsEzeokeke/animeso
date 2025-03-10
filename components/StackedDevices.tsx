import Device from "./device";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDevices({
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
            opacity: index === 0 ? 0 : 1,
          }}
        >
          <Device
            className={`shadow-xl ${
              index === 1 ? "border-none" : "border-white border-4"
            } ${index === 1 ? " h-[65vh]" : "h-[66.5vh]"}`}
            style={{
              opacity: `${index === 0 ? 0 : 1}`,
              transform: `perspective(1500px) 
                         rotateX(${
                           index === 0
                             ? 0
                             : index === 1
                             ? 2
                             : index === -0.5
                             ? -0.5
                             : 0
                         }deg) 
                         rotateY(${-50 + index * 3}deg) 
                         rotateZ(${10 - index * 1}deg) 
                         translateZ(${30 - index * 5}px)`,
            }}
          >
            {index === 1 && (
              <>
                {/* just change the src of the videas each time and try not to cause rerenders or load all at once using switch...... */}
                <div className="h-full w-[20vw] bg-red-500 overflow-hidden">
                  <video 
                    src="/phoneVidOne.mov" 
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </>
            )}
          </Device>
        </div>
      ))}
    </div>
  );
}
