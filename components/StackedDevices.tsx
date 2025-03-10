import Device from "./device";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDevices({
  count = 3,
  className = "",
  offset = 5,
}: StackedDevicesProps) {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${index * offset}px`,
            left: `0px`,
            zIndex: count - index,
            opacity: index === 0 ? 0 : 1,
            // backgroundColor: index === 0 ? "red" : index === 1 ? "blue" : "green"
          }}
        >
          <Device
            className={`shadow-xl ${
              index === 1 ? "border-none" : "border-white border-4"
            }`}
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
                hello world this is some contents that i want rendered out only
                on the first line or row so that it would appear and seem very
                real as possible and cool as fuckkk!!!!!!!!!!!!
              </>
            )}
          </Device>
        </div>
      ))}
    </div>
  );
}

// left: ${index * offset}
