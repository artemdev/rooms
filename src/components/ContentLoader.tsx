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
        <div className='spinner-border text-primary' role='status'>
          <span className='sr-only'></span>
        </div>
      </span>

      {text}
    </div>
  );
}
