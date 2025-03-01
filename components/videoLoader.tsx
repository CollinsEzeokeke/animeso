// components/VideoLoader.tsx
'use client';

import { MotionValue, motion } from 'framer-motion';
import { useRef, useEffect, useMemo, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Use the 'loadedmetadata' event instead of 'canplaythrough'
    // which triggers earlier in the loading process
    const handleLoaded = () => {
      setIsLoaded(true);
    };
    
    const handleCanPlay = () => {
      if (hasStartedPlaying.current) return;
      
      // Use a single RAF call for better performance
      requestAnimationFrame(() => {
        video.play().then(() => {
          hasStartedPlaying.current = true;
        }).catch(err => {
          console.warn('Auto-play failed:', err);
          // If autoplay fails, allow scrolling
          setCanScroll(true);
        });
      });
    };

    const handleEnded = () => {
      setCanScroll(true);
    };

    // Add event listeners with passive option
    video.addEventListener('loadedmetadata', handleLoaded, { passive: true });
    video.addEventListener('canplaythrough', handleCanPlay, { passive: true });
    video.addEventListener('ended', handleEnded, { passive: true });

    // Optimize video settings
    if (video.playsInline === false) {
      video.playsInline = true;
    }
    
    // Set low quality for better performance if needed
    // This can significantly improve performance on mobile
    video.setAttribute('playsinline', '');
    
    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      
      // Clear video source and references
      if (!video.ended && video.readyState > 2) {
        video.pause();
      }
      
      // Nullify src instead of setting to empty string (more efficient)
      URL.revokeObjectURL(video.src);
      video.removeAttribute('src');
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
        preload="metadata" // Changed from "auto" to "metadata" for faster initial loading
        style={{
          visibility: isLoaded ? 'visible' : 'hidden',
          // Add hardware acceleration
          transform: 'translateZ(0)'
        }}
      >
        <source src="/minor.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};


// // components/VideoLoader.tsx
// 'use client';

// import { MotionValue, motion } from 'framer-motion';
// import { useRef, useEffect, useMemo, useState } from 'react';
// import { useScrollStore } from '../hooks/store/scrollStore';
// import { useWindowSize } from '@uidotdev/usehooks';

// export const VideoLoader = ({
//   y, 
//   visibility
// }: {
//   y: MotionValue<string>, 
//   visibility?: MotionValue<number>
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const { setCanScroll } = useScrollStore();
//   const hasStartedPlaying = useRef(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { height } = useWindowSize();

//   // Calculate responsive position based on screen height
//   const responsiveTop = useMemo(() => {
//     if (!height) return '5%';
    
//     if (height <= 405) {
//       return '2%';
//     } else if (height <= 600) {
//       return '3%';
//     } else if (height <= 800) {
//       return '4%';
//     } else {
//       return '5%';
//     }
//   }, [height]);

//   useEffect(() => {
//     if (!videoRef.current) return;
    
//     const video = videoRef.current;
    
//     // Use the 'loadedmetadata' event instead of 'canplaythrough'
//     // which triggers earlier in the loading process
//     const handleLoaded = () => {
//       setIsLoaded(true);
//     };
    
//     const handleCanPlay = () => {
//       if (hasStartedPlaying.current) return;
      
//       // Use a single RAF call for better performance
//       requestAnimationFrame(() => {
//         video.play().then(() => {
//           hasStartedPlaying.current = true;
//         }).catch(err => {
//           console.warn('Auto-play failed:', err);
//           // If autoplay fails, allow scrolling
//           setCanScroll(true);
//         });
//       });
//     };

//     const handleEnded = () => {
//       setCanScroll(true);
//     };

//     // Add event listeners with passive option
//     video.addEventListener('loadedmetadata', handleLoaded, { passive: true });
//     video.addEventListener('canplaythrough', handleCanPlay, { passive: true });
//     video.addEventListener('ended', handleEnded, { passive: true });

//     // Optimize video settings
//     if (video.playsInline === false) {
//       video.playsInline = true;
//     }
    
//     // Set low quality for better performance if needed
//     // This can significantly improve performance on mobile
//     video.setAttribute('playsinline', '');
    
//     // Cleanup function
//     return () => {
//       video.removeEventListener('loadedmetadata', handleLoaded);
//       video.removeEventListener('canplaythrough', handleCanPlay);
//       video.removeEventListener('ended', handleEnded);
      
//       // Clear video source and references
//       if (!video.ended && video.readyState > 2) {
//         video.pause();
//       }
      
//       // Nullify src instead of setting to empty string (more efficient)
//       URL.revokeObjectURL(video.src);
//       video.removeAttribute('src');
//       video.load();
//       hasStartedPlaying.current = false;
//     };
//   }, [setCanScroll]);

//   // Memoize styles for better performance
//   const motionStyles = useMemo(() => ({
//     y,
//     visibility,
//     willChange: 'transform, opacity'
//   }), [y, visibility]);

//   return (
//     <motion.div 
//       className="absolute z-10 inset-0 w-full contain-paint"
//       style={{
//         ...motionStyles,
//         height: '100%',
//         top: responsiveTop
//       }}
//     >
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         playsInline
//         className="h-full w-full object-contain"
//         preload="metadata" // Changed from "auto" to "metadata" for faster initial loading
//         style={{
//           visibility: isLoaded ? 'visible' : 'hidden',
//           // Add hardware acceleration
//           transform: 'translateZ(0)'
//         }}
//       >
//         <source src="/minor.mp4" type="video/mp4" />
//       </video>
//     </motion.div>
//   );
// };
