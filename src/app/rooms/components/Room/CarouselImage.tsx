import { useState, useRef } from 'react';

import Image from 'next/image';
import { ContentLoader } from '@/components/ContentLoader';

import { CONTENT_HEIGHT } from './data';

type ICarouselImage = {
  url: string;
};

export function CarouselImage({ url }: ICarouselImage) {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      ref={imageRef}
      style={{ height: CONTENT_HEIGHT }}
      className='position-relative'
    >
      {isLoading && <ContentLoader />}

      <Image
        src={url}
        alt='Carousel slide'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
        loading='lazy'
        priority={false}
        quality={85}
        className={`rounded-2 transition-opacity duration-500 object-cover ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
