"use client";

import { useRef } from "react"; //useState, useEffect, useCallback
import {
  motion,
  useAnimation,
  // type PanInfo,
  useMotionValue,
  // animate,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

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
  // cardsPerView = 3,
  dotLabels = [
    { text: "Features", value: "features" },
    { text: "Pricing", value: "pricing" },
    { text: "About", value: "about" },
  ],
}: EnhancedSmoothCarouselProps) {
  // const [currentIndex, setCurrentIndex] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [containerWidth, setContainerWidth] = useState(0)
  // const [cardWidth, setCardWidth] = useState(0)
  // const [cardsToShow, setCardsToShow] = useState(cardsPerView)
  // const [selectedOption, setSelectedOption] = useState<string | null>(null)
  // const [isDraggingDot, setIsDraggingDot] = useState(false)
  // const [isFocused, setIsFocused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null);
  // const containerRef = useRef<HTMLDivElement>(null)
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Motion values for the scrollbar-like behavior
  const x = useMotionValue(0);
  // const scrollProgress = useMotionValue(0)

  // Total number of pages
  // const totalPages = Math.ceil(cards.length / cardsToShow)
  const targetContainer = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({
    container: targetContainer,
    offset: ["start start", "end end"],
  });

  // const targetX = useTransform(scrollX, [0, 1], [0, -cardWidth * cards.length + cardWidth * cardsToShow])
  useMotionValueEvent(scrollX, "change", (latest) => {
    console.log("scrollX", latest);
  });

  // // Recalculate dimensions on mount and resize
  // useEffect(() => {
  //   const updateDimensions = () => {
  //     if (containerRef.current) {
  //       const width = containerRef.current.offsetWidth
  //       setContainerWidth(width)

  //       // Adjust cards to show based on screen width
  //       if (width < 640) {
  //         setCardsToShow(1)
  //       } else if (width < 1024) {
  //         setCardsToShow(2)
  //       } else {
  //         setCardsToShow(cardsPerView)
  //       }

  //       // Calculate card width based on container and cards to show
  //       setCardWidth(width / cardsToShow)
  //     }
  //   }

  //   updateDimensions()
  //   window.addEventListener("resize", updateDimensions)

  //   return () => {
  //     window.removeEventListener("resize", updateDimensions)
  //   }
  // }, [cardsPerView, cardsToShow])

  // // Sync x motion value with scrollProgress
  // useEffect(() => {
  //   const totalWidth = cardWidth * cards.length
  //   const maxScroll = totalWidth - cardWidth * cardsToShow

  //   if (maxScroll <= 0) return

  //   const unsubscribeX = x.onChange((latest) => {
  //     // Convert x position to progress (0 to 1)
  //     const progress = Math.abs(latest) / maxScroll
  //     scrollProgress.set(Math.min(Math.max(progress, 0), 1))

  //     // Update current index based on scroll position
  //     const newIndex = Math.round(progress * (totalPages - 1))
  //     if (newIndex !== currentIndex) {
  //       setCurrentIndex(newIndex)

  //       // Set the selected option based on the current index
  //       if (dotLabels[newIndex]) {
  //         setSelectedOption(dotLabels[newIndex].value)
  //       }
  //     }
  //   })

  //   return () => {
  //     unsubscribeX()
  //   }
  // }, [cardWidth, cards.length, cardsToShow, currentIndex, dotLabels, scrollProgress, totalPages, x])

  // // Enable horizontal scrolling with mouse wheel and trackpad gestures
  // useEffect(() => {
  //   const carousel = carouselRef.current
  //   if (!carousel) return

  //   const handleWheel = (e: WheelEvent) => {
  //     // Check if this is a trackpad horizontal gesture (deltaX is significant)
  //     const isTrackpadHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5

  //     // For trackpad horizontal gestures or vertical wheel scrolls
  //     if (isTrackpadHorizontalGesture || Math.abs(e.deltaY) > 0) {
  //       e.preventDefault()

  //       const totalWidth = cardWidth * cards.length
  //       const maxScroll = totalWidth - cardWidth * cardsToShow

  //       if (maxScroll <= 0) return

  //       // Get current x position
  //       const currentX = x.get()

  //       // Calculate new position based on wheel delta
  //       // For trackpad gestures, use deltaX; for mouse wheel, use deltaY
  //       let newX = currentX - (isTrackpadHorizontalGesture ? e.deltaX : e.deltaY)

  //       // Clamp the value to prevent overscrolling
  //       newX = Math.min(0, Math.max(-maxScroll, newX))

  //       // Animate to the new position with gentler spring physics for smoother scrolling
  //       animate(x, newX, {
  //         type: "spring",
  //         stiffness: 180, // Reduced for smoother motion
  //         damping: 25, // Adjusted for better balance
  //         mass: 1, // Increased for more inertia
  //         velocity: 0, // Start with zero velocity
  //         restDelta: 0.001, // Smaller value for more precise animation
  //         onUpdate: (latest) => {
  //           controls.set({ x: latest })
  //         },
  //       })
  //     }
  //   }

  //   carousel.addEventListener("wheel", handleWheel, { passive: false })

  //   return () => {
  //     carousel.removeEventListener("wheel", handleWheel)
  //   }
  // }, [cardWidth, cards.length, cardsToShow, x, controls])

  // const scrollToCard = useCallback((index: number) => {
  //   // Ensure index is within bounds
  //   const boundedIndex = Math.max(0, Math.min(index, totalPages - 1))
  //   setCurrentIndex(boundedIndex)

  //   // Calculate scroll position
  //   const totalWidth = cardWidth * cards.length
  //   const maxScroll = totalWidth - cardWidth * cardsToShow
  //   const progress = boundedIndex / (totalPages - 1)
  //   const targetX = -progress * maxScroll

  //   // Animate to the new position with gentler spring physics for smoother transitions
  //   animate(x, targetX, {
  //     type: "spring",
  //     stiffness: 180, // Reduced from 300 for smoother motion
  //     damping: 25, // Adjusted for better balance
  //     mass: 1, // Increased from 0.5 for more inertia
  //     velocity: 0, // Start with zero velocity for consistent behavior
  //     restDelta: 0.001, // Smaller value for more precise animation
  //     onUpdate: (latest) => {
  //       controls.set({ x: latest })
  //     },
  //   })

  //   // Set the selected option based on the dot clicked
  //   if (dotLabels[index]) {
  //     setSelectedOption(dotLabels[index].value)
  //   }
  // },[cardWidth, cards.length, cardsToShow, controls, dotLabels, totalPages, x])

  // // Add keyboard navigation
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     // Only handle arrow keys if the carousel is focused
  //     if (!isFocused) return

  //     if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
  //       e.preventDefault()

  //       if (e.key === "ArrowLeft") {
  //         // Navigate to previous card with smooth transition
  //         const prevIndex = Math.max(0, currentIndex - 1)
  //         if (prevIndex !== currentIndex) {
  //           // Use the scrollToCard function which now has smoother animation
  //           scrollToCard(prevIndex)
  //         }
  //       } else {
  //         // Navigate to next card with smooth transition
  //         const nextIndex = Math.min(totalPages - 1, currentIndex + 1)
  //         if (nextIndex !== currentIndex) {
  //           // Use the scrollToCard function which now has smoother animation
  //           scrollToCard(nextIndex)
  //         }
  //       }
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown)
  //   }
  // }, [currentIndex, isFocused, scrollToCard, totalPages])

  // const handleDotClick = (index: number) => {
  //   scrollToCard(index)
  // }

  // // Handle drag gestures on the carousel
  // const handleDragEnd = (_: unknown, info: PanInfo) => {
  //   const { offset, velocity } = info

  //   // Get current x position
  //   // const currentX = x.get()

  //   // Calculate total width and max scroll
  //   const totalWidth = cardWidth * cards.length
  //   const maxScroll = totalWidth - cardWidth * cardsToShow

  //   if (maxScroll <= 0) return

  //   // Determine if we should change slides based on drag distance or velocity
  //   if (Math.abs(offset.x) > cardWidth / 3 || Math.abs(velocity.x) > 500) {
  //     // Calculate target index based on direction
  //     let targetIndex = currentIndex

  //     if (offset.x > 0) {
  //       // Dragged right
  //       targetIndex = Math.max(0, currentIndex - 1)
  //     } else {
  //       // Dragged left
  //       targetIndex = Math.min(totalPages - 1, currentIndex + 1)
  //     }

  //     scrollToCard(targetIndex)
  //   } else {
  //     // If the drag wasn't far enough, snap back to current index
  //     scrollToCard(currentIndex)
  //   }
  // }

  // // Handle dot drag for scrollbar-like behavior
  // const handleDotDragStart = () => {
  //   setIsDraggingDot(true)
  // }

  // const handleDotDrag = (_: unknown, info: PanInfo) => {
  //   if (!dotsContainerRef.current) return

  //   // Get dots container dimensions
  //   const dotsRect = dotsContainerRef.current.getBoundingClientRect()
  //   const dotsWidth = dotsRect.width

  //   // Calculate the relative position within the dots container (0 to 1)
  //   const relativeX = Math.max(0, Math.min(1, (info.point.x - dotsRect.left) / dotsWidth))

  //   // Calculate the target index based on the relative position
  //   const targetIndex = Math.round(relativeX * (totalPages - 1))

  //   // Scroll to the target card
  //   if (targetIndex !== currentIndex) {
  //     scrollToCard(targetIndex)
  //   }
  // }

  // const handleDotDragEnd = () => {
  //   setIsDraggingDot(false)
  // }

  // // Handle focus for keyboard navigation
  // const handleFocus = () => {
  //   setIsFocused(true)
  // }

  // const handleBlur = () => {
  //   setIsFocused(false)
  // }

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-purple-500", className)}
      // ref={containerRef}
      ref={targetContainer}
      tabIndex={0}
      // onFocus={handleFocus}
      // onBlur={handleBlur}
      aria-roledescription="carousel"
      aria-label="Feature cards carousel"
    >
      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex"
          style={{ x }}
          animate={controls}
          initial={{ x: 0 }}
          drag="x"
          dragConstraints={{
            // left: -(cardWidth * cards.length - cardWidth * cardsToShow),
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
          // onDragEnd={handleDragEnd}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={cn("px-4", card.className)}
              // style={{
              //   minWidth: cardWidth,
              //   maxWidth: cardWidth,
              // }}
              // aria-hidden={idx !== currentIndex}
            >
              <div className="bg-card rounded-xl p-6 h-[300px] shadow-md">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <div className="text-muted-foreground">
                  {/* Card content would go here */}
                  <p>Card content placeholder</p>
                  {/* {selectedOption && (
                    <p className="mt-4 text-sm font-medium text-primary">
                      Selected option: {selectedOption}
                    </p>
                  )} */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive dot navigation that works like a scrollbar */}
      <div
        ref={dotsContainerRef}
        className="flex justify-center mt-8 gap-3 relative cursor-pointer"
        // onMouseDown={handleDotDragStart}
        // onMouseUp={handleDotDragEnd}
        role="tablist"
        aria-label="Carousel navigation"
      >
        {/* Drag area for scrollbar-like behavior */}
        <motion.div
          className="absolute inset-0 -mx-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          // onDrag={handleDotDrag}
          // onDragStart={handleDotDragStart}
          // onDragEnd={handleDotDragEnd}
          // style={{ cursor: isDraggingDot ? "grabbing" : "grab" }}
        />

        {Array.from({ length: Math.min( dotLabels.length) }).map(
          (_, index) => (
            <button
              key={index}
              // onClick={() => handleDotClick(index)}
              className="relative flex items-center justify-center h-8 focus:outline-none z-10"
              aria-label={`Go to ${dotLabels[index].text}`}
              role="tab"
              aria-selected={currentIndex === index}
              tabIndex={-1}
            >
              {/* Base dot that's always visible */}
              <motion.div
                className={cn(
                  "rounded-full transition-colors",
                  currentIndex === index ? "bg-white" : "bg-white/50"
                )}
                initial={false}
                animate={{
                  width: currentIndex === index ? "auto" : "10px",
                  height: currentIndex === index ? "32px" : "10px",
                  borderRadius: currentIndex === index ? "16px" : "50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                {/* Text that appears when active */}
                {currentIndex === index && (
                  <motion.span
                    className="px-4 text-xs font-medium text-primary-foreground whitespace-nowrap text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dotLabels[index].text}
                  </motion.span>
                )}
              </motion.div>
            </button>
          )
        )}
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate between slides when the carousel is focused.
      </div>
    </div>
  );
}
