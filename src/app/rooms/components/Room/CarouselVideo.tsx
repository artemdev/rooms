import { useState, useRef } from 'react';
import useInView from './useInView';

import { ContentLoader } from '@/components/ContentLoader';

import { CONTENT_HEIGHT } from './data';

type ICarouselVideo = {
  url: string;
};

export function CarouselVideo({ url }: ICarouselVideo) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const isInView = useInView({
    contentRef: videoRef,
    threshold: 0.3,
  });

  return (
    <div ref={videoRef} style={{ height: CONTENT_HEIGHT }}>
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
