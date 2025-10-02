'use client';
import { debounce } from 'lodash';
import Room from './Room';

import { useState, useEffect } from 'react';

import { fetch } from './api';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(500)
      .then((res: unknown) => setData(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  useInfiniteScroll((page) => {
    setIsLoadingMore(true);
    fetch(500, page)
      .then((res: unknown) =>
        setData((prevData: any) => [...prevData, ...res.data]),
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoadingMore(false));
  });

  if (error) {
    return error;
  }

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>Data length: {data.length}</div>
      </nav>

      <div className='d-flex flex-column justify-content-center align-items-center'>
        {data.map((room) => (
          <Room key={room.id} name={room.name} variants={room.variants} />
        ))}
        {isLoadingMore && <Loader />}
      </div>
    </div>
  );
}

export const useInfiniteScroll = (
  fetchData: (page: number) => Promise<void>,
) => {
  const [_, setPage] = useState(0);

  const handleScroll = debounce(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 200;
    if (bottom) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export function Loader() {
  return (
    <div className='spinner-border text-primary' role='status'>
      <span className='sr-only'></span>
    </div>
  );
}
