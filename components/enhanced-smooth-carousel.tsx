"use client";

import { useRef } from "react"; //useState, useEffect, useCallback
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
// import Image from "next/image";

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
  const targetContainer = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({
    container: targetContainer,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollX, "change", (latest) => {
    console.log("scrollX", latest);
  });
  const ImageReturn = ({ cardId }: { cardId: number }) => {
    switch (cardId) {
      case 0:
        return (
          <div className="w-[17.5vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
            <Image
              src="/feature-nlp-preview.webp"
              width={400}
              height={800}
              alt=""
            />
          </div>
        );
      case 1:
        return (
          <div className="w-[17.5vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
            <Image
              src="/feature-widgets-preview.webp"
              width={400}
              height={800}
              alt=""
            />
          </div>
        );
      case 2:
        return (
          <div className="w-[17.5vw] h-[40vh] bg-blue-500/45 z-0 flex items-center">
            <Image
              src="/feature-accounts-preview.webp"
              width={400}
              height={800}
              alt=""
            />
          </div>
        );
      case 3:
        return (
          <div className="w-[17.5vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
            <Image src="/avatar.png" width={400} height={800} alt="" />
          </div>
        );
      case 4:
        return (
          <div className="w-[17.5vw] relaitve h-[40vh] bg-blue-500/45 z-0 flex items-center">
            <Image
              src="/feature-timezones-preview.webp"
              width={400}
              height={800}
              alt=""
            />
          </div>
        );
      default:
        return "";
    }
  };

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
          <div className="bg-black relative z-10">
            <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
            <p>Card content placeholder</p>
          </div>
        );
      case 1:
        return (
          <div className="bg-black relative z-10">
            <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
            <p>Card content placeholder</p>
          </div>
        );
      case 2:
        return (
          <div className="bg-black relative z-10">
            <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
            <p>Card content placeholder</p>
          </div>
        );
      case 3:
        return (
          <div className="bg-black relative z-10">
            <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
            <p>Card content placeholder</p>
          </div>
        );
      case 4:
        return (
          <div className="bg-black relative z-10">
            <h3 className="text-xl font-semibold mb-2">{cardTitle}</h3>
            <p>Card content placeholder</p>
          </div>
        );
      default:
        return "";
    }
  };
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden h-full bg-purple-500 flex justify-center items-end",
        className
      )}
      ref={targetContainer}
    >
      <div className="relative overflow-x-auto bg-pink-200 h-[80%] w-full">
        <motion.div className="flex bg-red-500 w-full">
          <div className="flex-shrink-0 flex items-center w-[36.5vw] h-[51vh] px-4 bg-green-500">
            this is some contents that would be shown and displayed before the
            main and major contents here so this should show first,......
          </div>
          {cards.map((card, id) => (
            <motion.div
              key={id}
              className={cn("px-4 bg-blue-500 h-full w-full", card.className)}
            >
              <div className="bg-card rounded-2xl p-6 h-full shadow-md bg-gray-500">
                {TopReturn({ cardId: id, cardTitle: card.title })}
                <div className="text-muted-foreground">
                  {ImageReturn({ cardId: id })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate between slides when the carousel is focused.
      </div>
    </div>
  );
}
