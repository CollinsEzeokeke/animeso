import { cn } from "@/lib/utils";
import { Video } from "lucide-react";
import Image from "next/image";

interface CardTwoProps{
    className?: string;
}

export default function CardTwo({className}: CardTwoProps) {
  const time = "10: 00";
  const imageUrl = "/avatar.png";
    return(
        <div
        className={cn(
          "card-content rounded-xl bg-white/95 h-16 w-full p-2 flex flex-col justify-around",
          "transition-all duration-300 ease-in-out ",
          className
        )}
      >
        <div 
        className="absolute rounded-xl shadow-lg flex justify-evenly items-center w-full h-full"
        // style={{
        //   background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,240,245,0.95) 100%)',
        //   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        // }}
      >
        {/* Purple accent bar */}
        <div className="relative left-0 top-0 bottom-0 w-1 bg-purple-500 h-[90%] rounded-lg" />

        
        {/* Content container */}
        <div className="m-0 bg-black-500 w-4/5 flex flex-col items-start">
          {/* Feedback title */}
          <h3 className="text-purple-500/90 font-bold text-xs">Feedback</h3>
          
          {/* Time with clock icon */}
          <div className="flex items-center mt-0.5 gap-0.5">
            <p className="text-purple-500/90 font-bold text-sm">{time}</p>
          </div>
          
          {/* User image and battery icon */}
          <div className="flex justify-between items-center mt-1 w-[90%]">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-purple/20">
              {imageUrl ? (
                <Image
                  src={imageUrl} 
                  alt="User" 
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">?</span>
                </div>
              )}
            </div>
            <Video className="text-gray-400 font-bold size-6 stroke-[4px] w-3 h-3" />
          </div>
        </div>
      </div>
      </div>
    )
}
