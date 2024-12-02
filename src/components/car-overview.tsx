import { Card } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CarOverview() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold text-purple-900 mb-6'>
        Car Overview
      </h1>
      <Card className='p-8 bg-white rounded-2xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6'>
          {/* Make Year */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Make Year</div>
            <div className='text-purple-900 font-semibold text-lg'>
              Aug 2021
            </div>
          </div>

          {/* Registration Year */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Registration Year</div>
            <div className='text-purple-900 font-semibold text-lg'>
              Dec 2021
            </div>
          </div>

          {/* Fuel Type */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Fuel Type</div>
            <div className='text-purple-900 font-semibold text-lg'>Diesel</div>
          </div>

          {/* Km driven */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Km driven</div>
            <div className='text-purple-900 font-semibold text-lg'>13K km</div>
          </div>

          {/* Transmission */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Transmission</div>
            <div className='flex items-center gap-2'>
              <span className='text-purple-900 font-semibold text-lg'>
                Manual (Regular)
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className='h-4 w-4 text-purple-900' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Regular manual transmission vehicle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* No. of Owner */}
          <div className='space-y-1'>
            <div className='text-gray-500'>No. of Owner</div>
            <div className='text-purple-900 font-semibold text-lg'>
              1st Owner
            </div>
          </div>

          {/* Insurance Validity */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Insurance Validity</div>
            <div className='text-purple-900 font-semibold text-lg'>
              Nov 2025
            </div>
          </div>

          {/* Insurance Type */}
          <div className='space-y-1'>
            <div className='text-gray-500'>Insurance Type</div>
            <div className='text-purple-900 font-semibold text-lg'>
              Third Party
            </div>
          </div>

          {/* RTO */}
          <div className='space-y-1'>
            <div className='text-gray-500'>RTO</div>
            <div className='text-purple-900 font-semibold text-lg'>DL3C</div>
          </div>

          {/* Car Location */}
          <div className='space-y-1 md:col-span-3'>
            <div className='text-gray-500'>Car Location</div>
            <div className='text-purple-900 font-semibold text-lg'>
              Sector-29, Gurgaon
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
