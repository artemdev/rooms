'use client';

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import { Loader } from './page';
import { useEffect, useRef, useState } from 'react';

const CONTENT_HEIGHT = '600px';

type Variant = {
  id: string;
  name: string;
  price: number;
  currency: string;
  videos: string[];
  images: string[];
  description: string;
};

type IRoom = {
  name: string;
  variants: Variant[];
};

export default function Room({ name, variants }: IRoom) {
  return (
    <Card bg='light' text='light' style={{ width: '35rem' }} className='mb-2'>
      <Card.Header>
        <h5 className='text-dark fw-bold py-2 m-0'>{name}</h5>
      </Card.Header>

      <Card.Body>
        {variants?.map((variant: Variant) => {
          return (
            <div key={variant.id} className='mb-2'>
              <div className='text-dark fw-bold mb-2'>
                <div>{variant.name}</div>
                <div className='text-success'>
                  {variant.price} {variant.currency}
                </div>
              </div>

              <MediaCarousel
                media={[...variant.videos, ...variant.images]}
                description={variant.description}
              />
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}

type IMediaCarousel = {
  media: string[];
  description: string;
};

function MediaCarousel({ media, description }: IMediaCarousel) {
  return (
    <Carousel data-bs-theme='dark' controls={media.length > 1}>
      {media.map((url) => (
        <Carousel.Item key={url}>
          {url.includes('.mp4') ? (
            <CarouselVideo url={url} />
          ) : (
            <CarouselImage url={url} />
          )}

          <Carousel.Caption className='bg-dark text-white rounded-2 opacity-75'>
            <span className='p-2'>{description}</span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
type ICarouselImage = {
  url: string;
};

function CarouselImage({ url }: ICarouselImage) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='position-relative' style={{ height: CONTENT_HEIGHT }}>
      {isLoading && <ContentLoader />}

      <Image
        src={url}
        alt='Carousel slide'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
        loading='lazy'
        className={`rounded-2 transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}

type ICarouselVideo = {
  url: string;
};

function CarouselVideo({ url }: ICarouselVideo) {
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
      {isLoading && <ContentLoader />}

      {isInView && (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%' }}
          onLoadedData={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}

function ContentLoader() {
  return (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
      <Loader />
    </div>
  );
}
