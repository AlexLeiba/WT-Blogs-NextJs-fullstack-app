'use client';

import { ChevronLeft } from 'lucide-react';

export default function GoBackButton() {
  return (
    <div className='flex  items-center text-black dark:text-white'>
      <div
        onClick={() => window.history.back()}
        className='cursor-pointer flex  items-center'
      >
        <ChevronLeft width={40} height={40} className='cursor-pointer' />
        <p>back</p>
      </div>
    </div>
  );
}
