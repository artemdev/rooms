import { useEffect, useState } from 'react';

export default function useInView({
  contentRef,
  threshold = 0.3,
}: {
  contentRef: React.RefObject<HTMLVideoElement | HTMLImageElement | null>;
  threshold: number;
}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Create an Intersection Observer to track when the video is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold },
    );

    if (contentRef?.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return isInView;
}
