'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function EMICalculator() {
  const [totalAmount, setTotalAmount] = React.useState(1326000);
  const [loanAmount, setLoanAmount] = React.useState(1060800);
  const [downPayment, setDownPayment] = React.useState(265200);
  const [duration, setDuration] = React.useState(66);
  const [showBreakup, setShowBreakup] = React.useState(false);

  const handleLoanAmountChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newLoanAmount = Array.isArray(newValue) ? newValue[0] : newValue;
    setLoanAmount(newLoanAmount);
    setDownPayment(totalAmount - newLoanAmount);
  };

  const handleDownPaymentChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newDownPayment = Array.isArray(newValue) ? newValue[0] : newValue;
    setDownPayment(newDownPayment);
    setLoanAmount(totalAmount - newDownPayment);
  };

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setDuration(Array.isArray(newValue) ? newValue[0] : newValue);
  };

  // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const principal = loanAmount;
    const rateOfInterest = 10; // 10% per annum
    const monthlyRate = rateOfInterest / (12 * 100);
    const numberOfPayments = duration;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return Math.round(emi);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const emiAmount = calculateEMI();

  return (
    <Card className=''>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-2xl font-bold'>Check Eligibility</CardTitle>
        <Button variant='ghost' size='icon'>
          <X className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span className='text-lg font-semibold'>Loan Amount</span>
            <span className='text-lg text-purple-600 font-bold'>
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <Slider
            value={loanAmount}
            min={100000}
            max={totalAmount}
            step={1000}
            onChange={handleLoanAmountChange}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e5e7eb',
              },
            }}
          />
          <div className='flex justify-between text-sm text-gray-500'>
            <span>{formatCurrency(100000)}</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span className='text-lg font-semibold'>Down Payment</span>
            <span className='text-lg text-purple-600 font-bold'>
              {formatCurrency(downPayment)}
            </span>
          </div>
          <Slider
            value={downPayment}
            min={0}
            max={totalAmount - 100000}
            step={1000}
            onChange={handleDownPaymentChange}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e5e7eb',
              },
            }}
          />
          <div className='flex justify-between text-sm text-gray-500'>
            <span>{formatCurrency(0)}</span>
            <span>{formatCurrency(totalAmount - 100000)}</span>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span className='text-lg font-semibold'>Duration of Loan</span>
            <span className='text-lg text-purple-600 font-bold'>
              {duration} Months
            </span>
          </div>
          <Slider
            value={duration}
            min={12}
            max={84}
            step={1}
            onChange={handleDurationChange}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#9333ea',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e5e7eb',
              },
            }}
          />
          <div className='flex justify-between text-sm text-gray-500'>
            <span>12 Months</span>
            <span>84 Months</span>
          </div>
        </div>

        <div className='pt-6'>
          <div className='flex items-baseline gap-2'>
            <span className='text-4xl font-bold text-green-600'>
              {formatCurrency(emiAmount)}
            </span>
            <span className='text-gray-500'>per month</span>
          </div>
          <Button
            variant='link'
            className='text-purple-600 p-0 h-auto font-semibold'
            onClick={() => setShowBreakup(!showBreakup)}
          >
            View Loan Breakup
          </Button>
          {showBreakup && (
            <div className='mt-4 space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Principal Amount</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Interest Amount</span>
                <span>{formatCurrency(emiAmount * duration - loanAmount)}</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span>Total Amount</span>
                <span>{formatCurrency(emiAmount * duration)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
          Check eligibility
        </Button>
        <div className='text-xs text-gray-500 space-y-2'>
          <p>
            *Rate of interest can vary subject to credit profile. Loan approval
            is at the sole discretion of the finance partner.
          </p>
          <p>**Processing fee and other loan charges are not included.</p>
        </div>
      </CardFooter>
    </Card>
  );
}
