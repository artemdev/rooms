import { Loader } from './Loader';

export function ContentLoader({
  text,
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${className}`}
    >
      <span className='me-2'>
        <Loader />
      </span>

      {text}
    </div>
  );
}
