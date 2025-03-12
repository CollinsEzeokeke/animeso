// components/VideoLoader.tsx
'use client';

import { MotionValue, motion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';

export const VideoLoader = ({
  y, 
  visibility
}: {
  y: MotionValue<string>, 
  visibility?: MotionValue<number>
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canScroll, setCanScroll] = useState(false);

  // Video event handlers
  useEffect(() => {
    // Skip unnecessary work if video ref isn't available
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Use passive event listeners for better performance
    const handleCanPlay = () => {
      // Use requestAnimationFrame to avoid layout thrashing
      requestAnimationFrame(() => {
        video?.play().catch(err => {
          console.warn('Auto-play failed:', err);
        });
      });
    };

    const handleEnded = () => {
      setCanScroll(true);
      
      // Batch style changes together
      requestAnimationFrame(() => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      });
    };

    // Add event listeners with passive option when possible
    video.addEventListener('canplaythrough', handleCanPlay, { passive: true });
    video.addEventListener('ended', handleEnded, { passive: true });

    // Cleanup function
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      
      // Remove references to avoid memory leaks
      video.src = '';
      video.load();
    };
  }, []);

  // Use memoized styles to prevent unnecessary style calculations
  const motionStyles = useMemo(() => ({
    y,
    scale: 1.01,
    visibility,
    willChange: 'transform, opacity'
  }), [y, visibility]);

  // Apply CSS containment for better performance isolation
  return (
    <motion.div 
      className="absolute z-10 inset-0 h-full top-[5%] w-full contain-paint"
      style={motionStyles}
    >
      <video
        // ref={videoRef}
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
