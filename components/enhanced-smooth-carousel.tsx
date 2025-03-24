"use client";

import { useRef } from "react"; //useState, useEffect, useCallback
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
  const ImageReturn = ({cardId}: {cardId: number}) => {
    switch(cardId) {
      case 0:
        return <Image src="/avatar.png" width={100} height={100} alt="Image 1" />;
      case 1:
        return <Image src="/firstShow.png" width={100} height={100} alt="Image 2" />;
      case 2:
        return <Image src="/logo-shaded.png" width={100} height={100} alt="Image 3" />;
      case 3:
        return <Image src="/stamponVideo.webp" width={100} height={100} alt="Image 4" />;
      default:
        return <Image src="/cloud-high.png" width={100} height={100} alt="Default image" />;
    }
  };
  return (
    <div
      className={cn("relative w-full overflow-hidden h-full bg-purple-500 flex justify-center items-center", className)}
      ref={targetContainer}
    >
      <div className="relative overflow-hidden bg-pink-200 h-[80%] w-full">
        <motion.div
          className="flex"
        >
          <div className="flex items-center w-[50vw]">
            this is some contents that would be shown and displayed before the main and major contents here so this should show first,......
          </div>
          {cards.map((card, id) => (
            <motion.div
              key={id}
              className={cn("px-4 bg-blue-500 h-full w-full", card.className)}
            >
              <div className="bg-card rounded-xl p-6 h-full shadow-md bg-gray-500">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <div className="text-muted-foreground">
                  {/* Card content would go here */}
                  <p>Card content placeholder</p>
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  asdfjajdf;lkajsdkfjaksdfklajskdfjkajsdfkjkl
                  {/* <Image src="" width={100} height={100} alt=""/> */}
                  {ImageReturn({cardId: id})}
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
