import Device from "./device";

interface StackedDevicesProps {
  count?: number;
  className?: string;
  offset?: number;
}

export default function StackedDevices({ 
  count = 3, 
  className = "",
  offset = 5 
}: StackedDevicesProps) {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="absolute"
          style={{
            top: `${index * offset}px`,
            left: `${index * offset}px`,
            zIndex: count - index,
            opacity: index === 0 ? 1 : 0.9 - (index * 0.1),
          }}
        >
          <Device 
            className="shadow-xl"
            style={{
              transform: `perspective(1500px) 
                         rotateX(${index * 2}deg) 
                         rotateY(${-50 + (index * 3)}deg) 
                         rotateZ(${10 - (index * 1)}deg) 
                         translateZ(${30 - (index * 5)}px)`,
            }}
          />
        </div>
      ))}
    </div>
  );
} 