'use client';

import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { Extracted_URLs } from '@/data/img-360';

const Car360Viewer: React.FC = () => {
  const images: string[] = Extracted_URLs;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const startX = useRef<number>(0);
  const dragging = useRef<boolean>(false);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ): void => {
    dragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ): void => {
    if (!dragging.current) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX.current;

    if (Math.abs(deltaX) > 10) {
      const newIndex =
        (currentIndex + (deltaX > 0 ? 1 : -1) + images.length) % images.length;
      setCurrentIndex(newIndex);
      startX.current = currentX; // Update startX to avoid jumpy transitions
    }
  };

  const handleMouseUp = (): void => {
    dragging.current = false;
  };

  return (
    <div
      className='flex justify-center items-center w-full h-screen bg-gray-100 overflow-hidden cursor-grab z-100'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <img
        src={images[currentIndex]}
        alt={`Car angle ${currentIndex}`}
        className='max-w-full max-h-full select-none pointer-events-none'
      />
    </div>
  );
};

export default Car360Viewer;
