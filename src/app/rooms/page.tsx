'use client';

import { toast } from 'react-toastify';
import { useState, useEffect, Fragment, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ContentLoader } from '@/components/ContentLoader';
import { Room } from './components';
import { LoadMore } from '@/app/rooms/components/LoadMore';

import { IRoom } from '@/types';

export default function RoomsPage() {
  const [data, setData] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<number>(1);

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        return res.json();
      })
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleDataAndPage = useCallback(({ data }: { data: IRoom[] }) => {
    setNextPage((prevPage) => prevPage + 1);
    setData((prevData) => [...prevData, ...data]);
  }, []);

  if (isLoading) {
    return <ContentLoader text='Loading rooms...' className='vh-100' />;
  }

  return (
    <div className='d-flex justify-content-center align-items-center m-3'>
      <Row>
        {data.map((room, index) => {
          const isLastRoom = data.length - 1 === index;

          return (
            <Fragment key={room.id}>
              <Col lg={4} md={6} key={room.id}>
                <Room key={room.id} name={room.name} variants={room.variants} />
              </Col>

              {isLastRoom && (
                <Col className='d-flex  align-items-start ms-2 mt-5'>
                  <LoadMore
                    nextPage={nextPage}
                    handleDataAndPage={handleDataAndPage}
                  />
                </Col>
              )}
            </Fragment>
          );
        })}
      </Row>
    </div>
  );
}
