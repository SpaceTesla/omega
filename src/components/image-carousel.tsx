'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

interface ImageCarouselProps {
  images: string[];
  autoplayInterval?: number;
  className?: string;
  onImageClick?: (index: number) => void;
}

export default function ImageCarousel({
  images,
  autoplayInterval = 3000,
  className,
  onImageClick,
}: ImageCarouselProps) {
  const [mainApi, setMainApi] = React.useState<any>();
  const [thumbApi, setThumbApi] = React.useState<any>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [mainCarousel] = useEmblaCarousel();
  const [thumbCarousel] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  React.useEffect(() => {
    if (mainApi && thumbApi) {
      mainApi.on('select', () => {
        setCurrentIndex(mainApi.selectedScrollSnap());
        thumbApi.scrollTo(mainApi.selectedScrollSnap());
      });
    }
  }, [mainApi, thumbApi]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        mainApi?.scrollNext();
      }, autoplayInterval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, mainApi, autoplayInterval]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className='relative aspect-[16/9] w-full'>
        <Carousel
          opts={{
            loop: true,
          }}
          setApi={setMainApi}
          className='w-full'
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                onClick={() => onImageClick && onImageClick(index)}
              >
                <div className='relative aspect-[16/9] w-full rounded-xl overflow-hidden'>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    // width={1920}
                    // height={1080}
                    className='object-cover'
                    priority={index === 0}
                  />
                  {index === 0 && (
                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded bg-black/50 px-2 py-1 text-sm text-white'>
                      {'Click to see in 360°'}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button
            variant='ghost'
            size='icon'
            className='absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70'
            onClick={() => mainApi?.scrollPrev()}
          >
            <ChevronLeft className='h-4 w-4 text-white' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70'
            onClick={() => mainApi?.scrollNext()}
          >
            <ChevronRight className='h-4 w-4 text-white' />
          </Button>
          <div className='absolute bottom-4 right-4 rounded bg-black/50 px-2 py-1 text-sm text-white'>
            {currentIndex + 1}/{images.length}
          </div>
        </Carousel>
      </div>

      <div className='relative mx-auto w-full max-w-[80%]'>
        <Carousel
          setApi={setThumbApi}
          opts={{
            containScroll: 'keepSnaps',
            dragFree: true,
          }}
        >
          <CarouselContent className='-ml-2'>
            {images.map((src, index) => (
              <CarouselItem key={index} className='basis-1/5 pl-2'>
                <div
                  className={cn(
                    'relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg',
                    currentIndex === index && 'border-2 border-black'
                  )}
                  onClick={() => mainApi?.scrollTo(index)}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Button
          variant='ghost'
          size='icon'
          className='absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70'
          onClick={() => thumbApi?.scrollPrev()}
        >
          <ChevronLeft className='h-4 w-4 text-white' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70'
          onClick={() => thumbApi?.scrollNext()}
        >
          <ChevronRight className='h-4 w-4 text-white' />
        </Button>
      </div>

      <Button
        variant='outline'
        size='icon'
        className='mx-auto'
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className='h-4 w-4' />
        ) : (
          <Play className='h-4 w-4' />
        )}
      </Button>
    </div>
  );
}
