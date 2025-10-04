'use client';

import { memo } from 'react';
import Card from 'react-bootstrap/Card';
import { MediaCarousel } from './MediaCarousel';

import Accordion from 'react-bootstrap/Accordion';

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

const Room = memo(({ name, variants }: IRoom) => {
  return (
    <Card bg='light' text='light' className='mb-2'>
      <Card.Header>
        <h5 className='text-dark fw-bold py-2 m-0'>{name}</h5>
      </Card.Header>

      <Card.Body>
        <Accordion defaultActiveKey={variants[0].id} alwaysOpen>
          {variants?.map((variant: Variant) => {
            return (
              <Accordion.Item
                key={variant.id}
                className='mb-2'
                eventKey={variant.id}
              >
                <Accordion.Header>
                  <div className='fw-bold me-2'>{variant.name}</div>
                  <div className='text-success'>
                    {variant.price} {variant.currency}
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <MediaCarousel
                    media={[...variant.videos, ...variant.images]}
                    description={variant.description}
                  />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Card.Body>
    </Card>
  );
});

Room.displayName = 'Room';

export { Room };
