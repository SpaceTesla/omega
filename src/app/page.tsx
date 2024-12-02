'use client';

import { useState } from 'react';
import ImageCarousel from '@/components/image-carousel';
import Car360Viewer from '@/components/photo-360';
import { Extracted_URLs } from '@/data/img-360';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import EMICalculator from '@/components/emi-calculator';
import CarOverview from '@/components/car-overview';

export default function Home() {
  const images = [
    'http://mda.spinny.com/sp-file-system/public/2024-10-27/41a8a8b2a63b414d81c687c80d30ede2/file.JPG',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/e7fb987326e3465dbbf6782dccee4d2c/file.JPG?q=85&w=1500',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/8d7b4bc2fdcf4188a934178e9d8cd167/file.JPG?q=85&w=900',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/6eee2a4ff0cf411eac08bc7560dc8e08/file.JPG?q=85&w=900',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/7bda23a875de4550b17b006ba26bc30e/file.JPG?q=85&w=900',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/a2d9912c99894eb2b8bfa30406647b4d/file.JPG?q=85&w=900',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/3b6c612714954ac29b71dda47d270afa/file.JPG?q=85&w=1500',
    'https://mda.spinny.com/sp-file-system/public/2024-10-27/4853cedc856f46a1942a9805845f51ef/file.JPG?q=85&w=900',
  ];

  const [showCar360Viewer, setShowCar360Viewer] = useState(false);

  const handleImageClick = (index: number) => {
    if (index === 0) {
      setShowCar360Viewer(true);
    }
  };

  return (
    <main className='flex flex-col lg:flex-row max-w-screen-xl mx-auto'>
      <div className='flex-1'>
        <ImageCarousel
          images={images}
          className='m-4'
          onImageClick={handleImageClick}
        />
        {showCar360Viewer && (
          <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 m-4 overflow-hidden'>
            <Car360Viewer />
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-4 top-8 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70'
              onClick={() => setShowCar360Viewer(false)}
            >
              <X className='h-4 w-4 text-white' />
            </Button>
          </div>
        )}
        <CarOverview />
      </div>
      <aside className='lg:w-1/4 m-4'>
        <EMICalculator />
      </aside>
    </main>
  );
}
