import { useCallback, useRef } from 'react';

export function useCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isTouch = useRef(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return;
    const card = cardRef.current;
    if (!card) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale3d(1.01, 1.01, 1.01)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  const handleTouchStart = useCallback(() => {
    isTouch.current = true;
  }, []);

  return { cardRef, handleMouseMove, handleMouseLeave, handleTouchStart };
}
