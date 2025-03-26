"use client";

import { useRef, useState } from "react"; //useState, useEffect, useCallback
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  className?: string;
}

interface DotLabel {
  text: string;
  value: string;
}

interface EnhancedSmoothCarouselProps {
  cards: CardProps[];
  className?: string;
  cardsPerView?: number;
  dotLabels?: DotLabel[];
}

export default function EnhancedSmoothCarousel({
  cards,
  className,
}: EnhancedSmoothCarouselProps) {
  // const targetContainer = useRef<HTMLDivElement>(null);
  // const { scrollX } = useScroll({
  //   container: targetContainer,
  //   offset: ["start start", "end end"],
  // });
  // useMotionValueEvent(scrollX, "change", (latest) => {
  //   console.log("scrollX", latest);
  // });

  const targetContainer = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollXProgress } = useScroll({
    container: targetContainer,
    offset: ["start start", "end end"],
  });

  // Calculate the positions to scroll to
  const calculateScrollPositions = () => {
    if (!targetContainer.current) return [];
    const container = targetContainer.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    return cards.map((_, index) => (scrollWidth * index) / (cards.length - 1));
  };

  // Scroll to a specific dot/section
  const scrollToIndex = (index: number) => {
    if (!targetContainer.current) return;
    const positions = calculateScrollPositions();
    targetContainer.current.scrollTo({
      left: positions[index],
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  // Update active index on scroll
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    console.log("scrollX", latest);
    const newIndex = Math.round(latest * (cards.length - 1));
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < cards.length) {
      setActiveIndex(newIndex);
    }
  });

  const TopReturn = ({
    cardId,
    cardTitle,
  }: {
    cardId: number;
    cardTitle: string;
  }) => {
    switch (cardId) {
      case 0:
        return (
          <div className="relative z-10 h-[15%]">
            <div className="flex items-center">
              <Image src="/feature-nlp.webp" width={60} height={80} alt="" />
              <h3 className="text-2xl font-bold mb-2">{cardTitle}</h3>
            </div>
            <div className="h-full font-bold text-[#BDBDBC] text-lg flex w-[80%] pl-3">
              <p className="w-full h-full">
                Schedule your todos using natural language, Amie understands
                you.
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="relative z-10 h-[15%]">
            <div className="flex items-center">
              <Image
                src="/feature-widgets.webp"
                width={60}
                height={80}
                alt=""
              />
              <h3 className="text-2xl font-bold mb-2 text-black">
                {cardTitle}
              </h3>
            </div>
            <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3">
              <p className="w-full h-full">
                Birthday, todos and schedules - only a glance away.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="relative z-10 h-[15%]">
            <div className="flex items-center">
              <Image
                src="/feature-accounts.webp"
                width={60}
                height={80}
                alt=""
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                {cardTitle}
              </h3>
            </div>
            <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3">
              <p className="w-full h-full">
                All your accounts, happily together in one place.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="relative z-10 h-[15%]">
            <div className="flex items-center">
              <Image
                src="/feature-pomodoro.webp"
                width={60}
                height={80}
                alt=""
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                {cardTitle}
              </h3>
            </div>
            <div className="h-full font-bold text-[#848383] text-lg flex w-[90%] pl-3">
              <p className="w-full h-full">
                {/* All your accounts, happily together in one place. */}
                Find the right balance between focus and breaks.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="relative z-10 h-[15%]">
            <div className="flex items-center space-x-2">
              <Image
                src="/feature-timezones.webp"
                width={50}
                height={40}
                alt=""
              />
              <h3 className="text-xl font-semibold mb-2 text-white/70">
                {cardTitle}
              </h3>
            </div>
            <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3 pt-2">
              <p className="w-full h-full">
                Travelling? Amie helps you judge multiple timezones so you can
                beat the jet lag.
              </p>
            </div>
          </div>
          // <div className="bg-black relative z-10">
          //   <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
          //   <p>Card content placeholder</p>
          // </div>
        );
      default:
        return "";
    }
  };

  const ImageReturn = ({ cardId }: { cardId: number }) => {
    switch (cardId) {
      case 0:
        return (
          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-end">
            <Image
              src="/feature-nlp-preview.webp"
              width={400}
              height={800}
              className="w-auto h-auto scale-x-100 -translate-x-2"
              alt=""
            />
            <div className="w-full h-[10%] flex justify-center items-center font-bold text-[#BDBDBC] text-base">
              <p>Available on Pro</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
            <Image
              src="/feature-widgets-preview.webp"
              width={400}
              height={800}
              className="w-auto h-auto scale-x-100 -translate-x-2"
              alt=""
            />
          </div>
        );
      case 2:
        return (
          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
            <Image
              src="/feature-accounts-preview.webp"
              width={400}
              height={800}
              className="w-auto h-auto scale-x-100 -translate-x-2"
              alt=""
            />
          </div>
        );
      case 3:
        return (
          // <div className="w-[17vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
          //   <Image src="/avatar.png" width={400} height={800} alt="" />
          // </div>

          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4 bg-green-500">
            <div className="w-full h-1/2 rounded-2xl bg-white/90">
              <div className="h-1/3 w-full flex justify-center pt-5">
                <div className="h-[35%] rounded-sm w-[6%] bg-transparent mt-[0.3rem] border-[#CDCDCD] border-2" />
                <div className=" w-auto px-2 flex flex-col items-start">
                  <h2 className="text-black font-bold text-xl">
                    Audit iOS interactions
                  </h2>
                  <p className="text-gray-500/70 text-lg font-bold">
                    Add description
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
            <Image
              src="/feature-timezones-preview.webp"
              width={400}
              height={800}
              className="w-auto h-auto scale-x-100 -translate-x-2"
              alt=""
            />
          </div>
        );
      default:
        return "";
    }
  };

  const BgReturn = ({
    cardId,
    children,
  }: {
    cardId: number;
    children: React.ReactNode;
  }) => {
    switch (cardId) {
      case 0:
        return (
          <div className="bg-gray-700/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
            {children}
          </div>
        );
      case 1:
        return (
          <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
            {children}
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
            {children}
          </div>
        );
      case 3:
        return (
          <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
            {children}
          </div>
        );
      case 4:
        return (
          <div className="bg-[#2A2A2A] bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md mr-[18vw]">
            {children}
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden h-full flex justify-center items-end",
        className
      )}
    >
      <div
        className="relative overflow-x-auto h-[80%] w-full scrollbar-hide"
        ref={targetContainer}
      >
        <motion.div className="flex w-full">
          <div className="flex-shrink-0 flex justify-center items-center w-[36vw] h-[51vh]">
            <div className="w-[70%] h-full flex flex-col justify-between">
              <div className="w-full h-[10%]">
                <p className="flex flex-col text-4xl items-start justify-center font-bold">
                  <span className="text-white/85">
                    Amie has all the features.
                  </span>
                  <span className="text-white/60">Both familiar and new.</span>
                </p>
              </div>

              <div className="h-[15%]">
                <p className="flex flex-col text-3xl font-bold items-start justify-start">
                  <span className="text-white/85">Available on</span>
                  <span className="text-white/60">Mac, iOS and Web.</span>
                </p>
              </div>
            </div>
          </div>
          {cards.map((card, id) => (
            <motion.div
              key={id}
              className={cn(
                "px-4 h-full w-full pointer-events-none",
                card.className
              )}
            >
              <BgReturn cardId={id}>
                {TopReturn({ cardId: id, cardTitle: card.title })}
                <div className="text-muted-foreground">
                  {ImageReturn({ cardId: id })}
                </div>
              </BgReturn>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators on the line
      <div className="bg-green-500">
        {cards.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-white scale-125" : "bg-white/60"
            }`}
            style={{
              left: `${(index / (cards.length - 1)) * 100}%`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-[10%]">
        {cards.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`transition-all duration-300 ${
              activeIndex === index
                ? "bg-gray-700/80 text-white text-xs font-bold rounded-xl py-1 px-3 flex justify-center items-center"
                : "bg-white/60 rounded-full w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeIndex === index && index === 0 ? <div>Scheduling</div> : ""}
            {activeIndex === index && index === 1 ? <div>Widgets</div> : ""}
            {activeIndex === index && index === 2 ? <div>Accounts</div> : ""}
            {activeIndex === index && index === 3 ? <div>Pomodoro</div> : ""}
            {activeIndex === index && index === 4 ? <div>Timezones</div> : ""}
          </motion.button>
        ))}
      </div>

      {/* 
    <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-[7%]">
          {/* Dot indicators on the line */}
      {/* {cards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`absolute top-1/2 transform -translate-y-1/2  transition-all duration-300 ${
                activeIndex === index ? "bg-gray-700/80 text-xs font-bold scale-125 mx-2 rounded-xl w-[50%] flex justify-center items-center" : "bg-white/60 rounded-full w-3 h-3"
              }`}
              style={{
                left: `${(index / (cards.length - 1)) * 100}%`,
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {activeIndex === index && index === 0 ? (<div>Scheduling</div>) : ""}
              {activeIndex === index && index === 1 ? (<div>Widgets</div>) : ""}
              {activeIndex === index && index === 2 ? (<div>Accounts</div>) : ""}
              {activeIndex === index && index === 3 ? (<div>Pomodoro</div>) : ""}
              {activeIndex === index && index === 4 ? (<div>Timezones</div>) : ""}
            </motion.button>
          ))} */}
      {/* </div> */}

      {/* </motion.div> */}

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate between slides when the carousel is focused.
      </div>
    </div>
  );
}

// "use client";

// import { useRef } from "react"; //useState, useEffect, useCallback
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// import { cn } from "@/lib/utils";
// import Image from "next/image";

// interface CardProps {
//   id: string;
//   title: string;
//   className?: string;
// }

// interface DotLabel {
//   text: string;
//   value: string;
// }

// interface EnhancedSmoothCarouselProps {
//   cards: CardProps[];
//   className?: string;
//   cardsPerView?: number;
//   dotLabels?: DotLabel[];
// }

// export default function EnhancedSmoothCarousel({
//   cards,
//   className,
// }: EnhancedSmoothCarouselProps) {
//   const targetContainer = useRef<HTMLDivElement>(null);
//   const { scrollX } = useScroll({
//     container: targetContainer,
//     offset: ["start start", "end end"],
//   });
//   useMotionValueEvent(scrollX, "change", (latest) => {
//     console.log("scrollX", latest);
//   });

//   const TopReturn = ({
//     cardId,
//     cardTitle,
//   }: {
//     cardId: number;
//     cardTitle: string;
//   }) => {
//     switch (cardId) {
//       case 0:
//         return (
//           <div className="relative z-10 h-[15%]">
//             <div className="flex items-center">
//               <Image src="/feature-nlp.webp" width={60} height={80} alt="" />
//               <h3 className="text-2xl font-bold mb-2">{cardTitle}</h3>
//             </div>
//             <div className="h-full font-bold text-[#BDBDBC] text-lg flex w-[80%] pl-3">
//               <p className="w-full h-full">
//                 Schedule your todos using natural language, Amie understands
//                 you.
//               </p>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="relative z-10 h-[15%]">
//             <div className="flex items-center">
//               <Image src="/feature-widgets.webp" width={60} height={80} alt="" />
//               <h3 className="text-2xl font-bold mb-2 text-black">{cardTitle}</h3>
//             </div>
//             <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3">
//               <p className="w-full h-full">
//                 Birthday, todos and schedules - only a glance away.
//               </p>
//             </div>
//           </div>
//         );
//       case 2:
//         return (

//           <div className="relative z-10 h-[15%]">
//             <div className="flex items-center">
//               <Image src="/feature-accounts.webp" width={60} height={80} alt="" />
//               <h3 className="text-xl font-semibold mb-2 text-black">{cardTitle}</h3>
//             </div>
//             <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3">
//               <p className="w-full h-full">
//                 All your accounts, happily together in one place.
//               </p>
//             </div>
//           </div>
//         );
//       case 3:
//         return (

//           <div className="relative z-10 h-[15%]">
//             <div className="flex items-center">
//               <Image src="/feature-pomodoro.webp" width={60} height={80} alt="" />
//               <h3 className="text-xl font-semibold mb-2 text-black">{cardTitle}</h3>
//             </div>
//             <div className="h-full font-bold text-[#848383] text-lg flex w-[90%] pl-3">
//               <p className="w-full h-full">
//                 {/* All your accounts, happily together in one place. */}
//                 Find the right balance between focus and breaks.
//               </p>
//             </div>
//           </div>
//         );
//       case 4:
//         return (

//           <div className="relative z-10 h-[15%]">
//             <div className="flex items-center space-x-2">
//               <Image src="/feature-timezones.webp" width={50} height={40} alt="" />
//               <h3 className="text-xl font-semibold mb-2 text-white/70">{cardTitle}</h3>
//             </div>
//             <div className="h-full font-bold text-[#848383] text-lg flex w-[88%] pl-3 pt-2">
//               <p className="w-full h-full">
//                 Travelling? Amie helps you judge multiple timezones so you can beat the jet lag.
//               </p>
//             </div>
//           </div>
//           // <div className="bg-black relative z-10">
//           //   <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
//           //   <p>Card content placeholder</p>
//           // </div>
//         );
//       default:
//         return "";
//     }
//   };

//   const ImageReturn = ({ cardId }: { cardId: number }) => {
//     switch (cardId) {
//       case 0:
//         return (
//           <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-end">
//             <Image
//               src="/feature-nlp-preview.webp"
//               width={400}
//               height={800}
//               className="w-auto h-auto scale-x-100 -translate-x-2"
//               alt=""
//             />
//             <div className="w-full h-[10%] flex justify-center items-center font-bold text-[#BDBDBC] text-base">
//               <p>Available on Pro</p>
//             </div>
//           </div>
//         );
//       case 1:
//         return (

//           <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
//             <Image
//               src="/feature-widgets-preview.webp"
//               width={400}
//               height={800}
//               className="w-auto h-auto scale-x-100 -translate-x-2"
//               alt=""
//             />
//           </div>
//         );
//       case 2:
//         return (

//           <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
//             <Image
//               src="/feature-accounts-preview.webp"
//               width={400}
//               height={800}
//               className="w-auto h-auto scale-x-100 -translate-x-2"
//               alt=""
//             />
//           </div>
//         );
//       case 3:
//         return (
//           <div className="w-[17vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
//             <Image src="/avatar.png" width={400} height={800} alt="" />
//           </div>
//         );
//       case 4:
//         return (

//           <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-center translate-y-4">
//             <Image
//               src="/feature-timezones-preview.webp"
//               width={400}
//               height={800}
//               className="w-auto h-auto scale-x-100 -translate-x-2"
//               alt=""
//             />
//           </div>
//         );
//       default:
//         return "";
//     }
//   };

//   const BgReturn = ({
//     cardId,
//     children,
//   }: {
//     cardId: number;
//     children: React.ReactNode;
//   }) => {
//     switch (cardId) {
//       case 0:
//         return (
//           <div className="bg-gray-700/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
//             {children}
//           </div>
//         );
//       case 1:
//         return (
//           <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
//             {children}
//           </div>
//         );
//       case 2:
//         return (
//           <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
//             {children}
//           </div>
//         );
//       case 3:
//         return (
//           <div className="bg-gray-300/80 bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md">
//             {children}
//           </div>
//         );
//       case 4:
//         return (
//           <div className="bg-[#2A2A2A] bg-card rounded-[2.5rem] p-6 h-[50.5vh] shadow-md mr-[18vw]">
//             {children}
//           </div>
//         );
//       default:
//         return "";
//     }
//   };

//   return (
//     <div
//       className={cn(
//         "relative w-full overflow-hidden h-full bg-purple-500 flex justify-center items-end",
//         className
//       )}
//       ref={targetContainer}
//     >
//       <div className="relative overflow-x-auto bg-pink-200 h-[80%] w-full">
//         <motion.div className="flex bg-red-500 w-full">
//           <div className="flex-shrink-0 flex justify-center items-center w-[36vw] h-[51vh] bg-green-500">
//             <div className="w-[70%] h-full bg-blue-500 flex flex-col justify-between">
//               <div className="w-full h-[10%] bg-red-500">
//               <p className="flex flex-col text-4xl items-start justify-center font-bold">
//                 <span className="text-white/85">Amie has all the features.</span>
//                 <span className="text-white/60">Both familiar and new.</span>
//               </p>
//               </div>

//               <div className="h-[15%] bg-red-500">
//                 <p className="flex flex-col text-3xl font-bold items-start justify-start">
//                   <span className="text-white/85">
//                     Available on
//                   </span>
//                   <span className="text-white/60">
//                   Mac, iOS and Web.
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//           {cards.map((card, id) => (
//             <motion.div
//               key={id}
//               className={cn("px-4 bg-blue-500 h-full w-full", card.className)}
//             >
//               <BgReturn cardId={id}>
//                 {TopReturn({ cardId: id, cardTitle: card.title })}
//                 <div className="text-muted-foreground">
//                   {ImageReturn({ cardId: id })}
//                 </div>
//               </BgReturn>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Instructions for keyboard users */}
//       <div className="sr-only">
//         Use arrow keys to navigate between slides when the carousel is focused.
//       </div>
//     </div>
//   );
// }
