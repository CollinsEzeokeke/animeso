// components/VideoLoader.tsx
'use client';

import { MotionValue, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export const VideoLoader = (
  {y, zoom} : {y: MotionValue<string>, zoom?: MotionValue<number>}
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const handleCanPlay = () => {
      videoRef.current?.play();
    };

    const handleEnded = () => {
      setCanScroll(true);
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };

    const video = videoRef.current;
    video?.addEventListener('canplaythrough', handleCanPlay);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('canplaythrough', handleCanPlay);
      video?.removeEventListener('ended', handleEnded);
    };
  }, []);
// if(canScroll){
//     // setScrollAble(canScroll)
// }
  return (
    <motion.div className="absolute z-10 inset-0 h-full top-[5%] w-full" style={{y, scale: zoom}}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-obtain"
      >
        <source src="/minor.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};
