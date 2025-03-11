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
  // const renderVideo = () => {
  //   if (currentProgression >= 0.99) {
  //     return (
  //       <video
  //         src="/phoneVidOne.mov"
  //         className="w-full h-full object-fill scale-x-100 origin-left"
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else if (currentProgression >= 0.825) {
  //     return (
  //       <video
  //         src="/phoneVidTwo.mp4"
  //         className="w-full h-full object-fill scale-x-100 origin-left"
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else if (currentProgression <= 0.66) {
  //     return (
  //       <video
  //         src="/phoneVidOne.mov"
  //         className="w-full h-full object-fill scale-x-100 origin-left"
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   } else {
  //     // Default video or fallback
  //     return (
  //       <video
  //         src="/phoneVidOne.mov"
  //         className="w-full h-full object-fill scale-x-100 origin-left"
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //       />
  //     );
  //   }
  // };

  return (
    <div className={`relative h-[80%] w-[60%]${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${index === 1 ? 5 : 10}px`,
            left: "0px",
            zIndex: count - index,
          }}
        >
          <Desktop
            className={`shadow-xl ${
              index === 1 ? "border-none" : "border-none border-4"
            } ${index === 1 ? " h-[50vh]" : "h-[50.5vh]"} ${
              index === 1 ? "bg-transparent" : "bg-white"
            } ${index === 0 && "bg-transparent"}`}
          >
            {index === 1 && (
              <>
                {/* Conditionally render videos based on currentProgression */}
                <div className="relative w-[45vw] h-[60vh] overflow-hidden">
                  {/* {renderVideo()} */}
                  <video
                    src="/one.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </>
            )}
          </Desktop>
        </div>
      ))}
    </div>
  );
}
