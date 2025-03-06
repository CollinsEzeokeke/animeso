"use client";
import WeatherLocation from "./WeatherLocation";
import NotificationSummary from "./NotificationSummary";
import { useRef, useEffect, useState, useCallback } from "react";

export default function SecondScrollOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  // Instead of a boolean, track opacity value (0-1)
  const [blueOpacity, setBlueOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Throttled scroll handler to improve performance
  const checkScrollPosition = useCallback(() => {
    // Throttle to max 60fps (16ms) for better performance
    const now = Date.now();
    if (now - lastScrollTime.current < 16) return;
    lastScrollTime.current = now;
    
    if (!containerRef.current || !spacerRef.current) return;
    
    // Get the position of the spacer element
    const { top: spacerTop, height: spacerHeight } = spacerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the spacer has been scrolled through (0-1)
    // 0 = spacer just entering viewport at bottom, 1 = spacer completely scrolled past top of viewport
    const scrollProgress = Math.min(Math.max((windowHeight - spacerTop) / (spacerHeight + windowHeight), 0), 1);
    
    // When the spacer is 70% scrolled through, the blue container should be fully visible
    const targetOpacity = Math.min(scrollProgress / 0.7, 1);
    
    // We only want to show the blue container when some part of spacer is in view
    // or we've scrolled past it
    const shouldBeVisible = scrollProgress > 0;
    
    // Update visibility state - only if changed
    setIsVisible(prev => {
      if (prev !== shouldBeVisible) return shouldBeVisible;
      return prev;
    });
    
    // Update opacity - with small threshold to prevent unnecessary updates
    setBlueOpacity(prev => {
      if (Math.abs(prev - targetOpacity) > 0.01) return targetOpacity;
      return prev;
    });
  }, []);
  
  useEffect(() => {
    // Check initial position
    checkScrollPosition();
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-full pointer-events-none z-[60]"
    >
      {/* Enhanced spacer to control when content appears */}
      <div ref={spacerRef} className="min-h-[100vh]" />
      
      {/* Red background container - this scrolls with the page */}
      <div className="relative w-full">
        <div className="w-full bg-red-500 min-h-[220vh] flex items-center justify-center text-white">
          Scrolling Content
        </div>
      </div>
      
      {/* Blue container - always rendered but opacity controlled by scroll */}
      {isVisible && (
        <div 
          className="fixed top-0 left-0 w-full h-screen z-30 flex items-center justify-center"
          style={{ 
            opacity: blueOpacity,
            transition: "opacity 0.05s linear",
            willChange: "opacity"
          }}
        >
          <div className="w-[70vw] h-full relative">
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500">
              <div className="w-full text-center space-y-6 z-10 text-white">
                THE SECOND SCROLL OVERLAY
                <WeatherLocation />
                <NotificationSummary />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional spacer at the end */}
      <div className="h-[50vh]" />
    </section>
  );
}
