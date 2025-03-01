// components/VideoLoader.tsx
'use client';

import { MotionValue, motion } from 'framer-motion';
import { useRef, useEffect, useMemo } from 'react';
import { useScrollStore } from '../hooks/store/scrollStore';

export const VideoLoader = ({
  y, 
  visibility
}: {
  y: MotionValue<string>, 
  visibility?: MotionValue<number>
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setCanScroll } = useScrollStore();
  const hasStartedPlaying = useRef(false);

  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleCanPlay = () => {
      if (hasStartedPlaying.current) return;
      
      requestAnimationFrame(() => {
        video.play().catch(err => {
          console.warn('Auto-play failed:', err);
          // If autoplay fails, allow scrolling
          setCanScroll(true);
        });
        hasStartedPlaying.current = true;
      });
    };

    const handleEnded = () => {
      setCanScroll(true);
    };

    // Add event listeners with passive option
    video.addEventListener('canplaythrough', handleCanPlay, { passive: true });
    video.addEventListener('ended', handleEnded, { passive: true });

    // Cleanup function
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      
      // Clear video source and references
      if (!video.ended) {
        video.pause();
      }
      video.src = '';
      video.load();
      hasStartedPlaying.current = false;
    };
  }, [setCanScroll]);

  // Memoize styles for better performance
  const motionStyles = useMemo(() => ({
    y,
    visibility,
    willChange: 'transform, opacity'
  }), [y, visibility]);

  return (
    <motion.div 
      className="absolute z-10 inset-0 h-full top-[5%] w-full contain-paint"
      style={motionStyles}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-obtain"
        preload="auto"
      >
        <source src="/minor.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};
