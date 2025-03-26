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
            <div className="h-full font-bold text-white/45 text-lg flex w-[85%] pl-3">
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
            <div className="h-full font-bold text-[#848383] text-lg flex w-[94%] pl-3">
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
            <div className="h-full font-bold text-[#848383] text-lg flex w-[93%] pl-3">
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
          <div className="w-[17vw] relaitve h-[42vh] z-0 flex flex-col justify-end">
            <Image
              src="/feature-nlp-preview.webp"
              width={400}
              height={800}
              className="w-auto h-auto scale-x-100 -translate-x-2"
              alt=""
            />
            <div className="w-full h-[10%] flex justify-center items-center font-bold text-white/45 text-base">
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

          <div className="w-[17vw] relaitve h-[40vh] z-0 flex flex-col justify-between translate-y-4">
            <div className="h-full flex items-center w-full">
              <div className="w-full h-[50%] rounded-2xl bg-white/90 mt-[6vh] flex flex-col justify-between">
                <div className="h-1/3 w-full flex justify-center pt-5">
                  <div className="h-[45%] rounded-sm w-[6.2%] bg-transparent mt-[0.3rem] border-[#CDCDCD] border-2" />
                  <div className=" w-auto px-2 flex flex-col items-start">
                    <h2 className="text-black font-bold text-xl">
                      Audit iOS interactions
                    </h2>
                    <p className="text-gray-500/70 text-lg font-bold">
                      Add description
                    </p>
                  </div>
                </div>
                <div className="w-full h-[20%] flex items-start justify-center">
                  <div className="w-[60%] self-center rounded-[20px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] p-1 gap-1 flex items-center">
                    <svg
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.61577 18.3477C3.04281 27.9501 8.74134 37.8202 18.3438 40.3931C27.9462 42.9661 37.8161 37.2676 40.3891 27.6652C42.962 18.0629 37.2636 8.19276 27.6612 5.61981C25.628 5.07501 23.5828 4.90106 21.5974 5.05648"
                        stroke="#EBEBEB"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M23.0039 5C13.0627 5 5.00391 13.0589 5.00391 23.0001C5.00391 32.9412 13.0627 41 23.0039 41C32.9449 41 41.0039 32.9412 41.0039 23.0001C41.0039 20.8951 40.6426 18.8746 39.9786 16.9971"
                        stroke="#FB923C"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      {/* Repeated rect elements with corrected attributes */}
                      {[...Array(12)].map((_, i) => (
                        <rect
                          key={i}
                          x="0.170754"
                          y="-0.0457534"
                          width="1.74999"
                          height="3.24999"
                          rx="0.874994"
                          transform="matrix(-0.500004 0.866023 -0.866028 -0.499996 33.9821 28.1351)"
                          fill="#D9D9D9"
                          stroke="#D9D9D9"
                          strokeWidth="0.25"
                        />
                      ))}
                    </svg>

                    <div className="flex-grow pl-1">
                      <div className="text-[24px] leading-[24px] font-semibold text-black">
                        28:49s
                      </div>
                    </div>

                    <div className="w-[1px] bg-gray-100 h-[32px]" />

                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="16.332"
                        y="14"
                        width="9.33333"
                        height="28"
                        rx="2.33333"
                        fill="#A3A3A3"
                      />
                      <rect
                        x="30.332"
                        y="14"
                        width="9.33333"
                        height="28"
                        rx="2.33333"
                        fill="#A3A3A3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[20%]">
              
      <div className="absolute bottom-7 -translate-x-4">
        <svg
          width="350"
          height="80"
          viewBox="0 0 508 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_13_1474"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="508"
            height="80"
          >
            <rect
              width="508"
              height="80"
              fill="url(#paint0_linear_13_1474)"
            ></rect>
          </mask>
          <g mask="url(#mask0_13_1474)">
            <rect x="252" width="6" height="80" rx="3" fill="#FB923C"></rect>
            <rect
              x="222"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="192"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="162"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="132"
              y="24"
              width="6"
              height="56"
              rx="3"
              fill="#737373"
            ></rect>
            <rect
              x="102"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="72"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="42"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="12"
              y="24"
              width="6"
              height="56"
              rx="3"
              fill="#737373"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 288 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 318 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 348 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="56"
              rx="3"
              transform="matrix(-1 0 0 1 378 24)"
              fill="#AFAFAF"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 408 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 438 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 468 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="56"
              rx="3"
              transform="matrix(-1 0 0 1 498 24)"
              fill="#AFAFAF"
            ></rect>
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_13_1474"
              x1="508"
              y1="34"
              x2="-3.76617e-05"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D9D9D9" stopOpacity="0.5"></stop>
              <stop offset="0.497641" stopColor="#D9D9D9"></stop>
              <stop offset="1" stopColor="#D9D9D9" stopOpacity="0.1"></stop>
            </linearGradient>
          </defs>
        </svg>
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
          <div className="bg-black/80 border-[0.5px] border-white/60 w-[19vw] bg-card rounded-[2.5rem] p-6 h-[52vh] shadow-md">
            {children}
          </div>
        );
      case 1:
        return (
          <div className="bg-white/70 bg-card  w-[19vw] rounded-[2.5rem] p-6 h-[52vh] shadow-md">
            {children}
          </div>
        );
      case 2:
        return (
          <div className="bg-white/70 bg-card w-[19vw] rounded-[2.5rem] p-6 h-[52vh] shadow-md">
            {children}
          </div>
        );
      case 3:
        return (
          <div className="bg-white/70 bg-card w-[19vw] rounded-[2.5rem] p-6 h-[52vh] shadow-md">
            {children}
          </div>
        );
      case 4:
        return (
          <div className="bg-[#2A2A2A] bg-card w-[19vw] rounded-[2.5rem] p-6 h-[52vh] shadow-md mr-[18vw]">
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
          <div className="flex-shrink-0 flex justify-end items-center w-[36vw] h-[51vh]">
            <div className="w-[70%] h-full flex flex-col justify-between">
              <div className="w-full h-[10%]">
                <p className="flex flex-col text-3xl items-start justify-center font-bold">
                  <span className="text-white/85">
                    Amie has all the features.
                  </span>
                  <span className="text-white/60">Both familiar and new.</span>
                </p>
              </div>

              <div className="h-[15%]">
                <p className="flex flex-col text-2xl font-bold items-start justify-start">
                  <span className=" text-white/60">Available on</span>
                  <span className="text-white/85">Mac, iOS and Web.</span>
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

      {/* Dot indicators on the line */}
  
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-[10%]">
        {cards.map((_, index) => (
          <motion.button
            key={index}
            initial={{opacity: `${activeIndex === index ? 0: 1}`}}
            animate={{opacity: `${activeIndex === index ? 1: 0.5}`}}
            transition={{duration: 0.5,  delay: 0.5}}
            onClick={() => scrollToIndex(index)}
            className={`transition-all duration-300 ${
              activeIndex === index
                ? "bg-black/80 text-white text-xs font-bold rounded-xl py-1 px-3 flex justify-center items-center"
                : "bg-black/60 rounded-full w-3 h-3"
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
      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate between slides when the carousel is focused.
      </div>
    </div>
  );
}