import { useMemo, useState } from 'react';
import { useLoadMorePagination } from './useLoadMorePagination';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import { IRoom } from '@/types';
import { ContentLoader } from '@/components/ContentLoader';

export function LoadMore({
  handleDataAndPage,
  nextPage,
}: {
  handleDataAndPage: ({ data }: { data: IRoom[] }) => void;
  nextPage: number;
}) {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean | null>(false);

  const debouncedFetch = useMemo(
    () =>
      debounce(() => {
        setIsLoadingMore(true);
        fetch(`/rooms?page=${nextPage}`)
          .then((res) => res.json())
          .then((data) => handleDataAndPage(data))
          .catch((error) => toast.error(error.message))
          .finally(() => setIsLoadingMore(false));
      }, 300),
    [nextPage, handleDataAndPage, setIsLoadingMore], // only recreate when these change
  );

  const loadMoreElRef = useLoadMorePagination(debouncedFetch);

  if (isLoadingMore) {
    return <ContentLoader text='Loading more rooms ...' className='gap-2' />;
  }

  return <div ref={loadMoreElRef} style={{ height: '1px' }} />;
}
