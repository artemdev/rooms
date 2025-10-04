import Carousel from 'react-bootstrap/Carousel';
import { CarouselVideo } from './CarouselVideo';
import { CarouselImage } from './CarouselImage';

type IMediaCarousel = {
  media: string[];
  description: string;
};

export function MediaCarousel({ media, description }: IMediaCarousel) {
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
