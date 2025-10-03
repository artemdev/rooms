import { useState, useEffect, useRef } from 'react';
import { ContentLoader } from '@/components/ContentLoader';

import { CONTENT_HEIGHT } from './data';

type ICarouselVideo = {
  url: string;
};

export function CarouselVideo({ url }: ICarouselVideo) {
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    // Create an Intersection Observer to track when the video is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting); // Set state based on whether video is visible
      },
      { threshold: 0.5 }, // Trigger when at least 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current); // Observe the video element
    }

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div
      ref={videoRef}
      className='w-100 position-relative'
      style={{ height: CONTENT_HEIGHT }}
    >
      {isLoading && <ContentLoader className='w-100 h-100' />}

      {isInView && (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          className='w-100'
          onLoadedData={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}
