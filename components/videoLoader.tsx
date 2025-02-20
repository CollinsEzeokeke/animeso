// components/VideoLoader.tsx
'use client';

// import { useStore } from '@/hooks/store';
import { useState, useRef, useEffect } from 'react';

export const VideoLoader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canScroll, setCanScroll] = useState(false);
//   const { setScrollAble } = useStore();

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
    <div className="absolute inset-0 z-0 h-full top-[5%] w-full scale-95">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/minor.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
