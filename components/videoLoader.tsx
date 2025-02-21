// components/VideoLoader.tsx
'use client';

// import { useStore } from '@/hooks/store';
import { useState, useRef, useEffect } from 'react';
// import { useScroll } from 'framer-motion';

export const VideoLoader = () => {
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
    <div className="absolute z-10 inset-0 h-full top-[5%] w-full" >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-obtain"
      >
        <source src="/minor.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
