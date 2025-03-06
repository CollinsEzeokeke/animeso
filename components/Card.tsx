import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
}

export default function Card({ className }: CardProps) {
  return (
    <div
      className={cn(
        "card-content rounded-xl bg-white/95 h-20 shadow-card w-full p-2 flex flex-col justify-between",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex items-start gap-2">
      {/* rounded-full bg-red-200  */}
        <div className="avatar-container rounded-full w-20 h-5 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-[url('/avatar.png')] bg-cover bg-center" />
        </div>

        <div className="w-32 h-full flex flex-col justify-around">
          <div className="h-[0.25rem] w-full bg-gray-200 rounded-full "></div>
          <div className="h-[0.2rem] w-full bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col justify-around space-y-[0.2rem]  mt-1">
        <div className="h-5 bg-gray-300 rounded-sm w-full"></div>
        <div className="h-1 bg-gray-200 rounded-full w-full"></div>
        <div className="h-1 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2 bg-white rounded-sm w-full"></div>
      </div>
    </div>
  );
}
