import { useMemo, useState } from 'react';
import { throttle } from 'lodash';
import { toast } from 'react-toastify';

import { useLoadMorePagination } from './useLoadMorePagination';

import { ContentLoader } from '@/components/ContentLoader';

import { IRoom } from '@/types';

export function LoadMore({
  handleDataAndPage,
  nextPage,
}: {
  handleDataAndPage: ({
    data,
    hasMorePages,
  }: {
    data: IRoom[];
    hasMorePages: boolean;
  }) => void;
  nextPage: number;
}) {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean | null>(false);

  const throttledFetch = useMemo(
    () =>
      throttle(() => {
        setIsLoadingMore(true);
        fetch(`/api/rooms?page=${nextPage}`)
          .then((res) => res.json())
          .then(({ data, hasMorePages }) =>
            handleDataAndPage({ data, hasMorePages }),
          )
          .catch((error) => toast.error(error.message))
          .finally(() => setIsLoadingMore(false));
      }, 500),
    [nextPage, handleDataAndPage, setIsLoadingMore],
  );

  const loadMoreElRef = useLoadMorePagination(throttledFetch);

  if (isLoadingMore) {
    return <ContentLoader text='Loading more rooms ...' className='gap-2' />;
  }

  return <div ref={loadMoreElRef} style={{ height: '1px' }} />;
}
