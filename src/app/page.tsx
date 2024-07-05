import { Suspense } from 'react';
import { FormCompoundInterest } from '../components/FormCompoundInterest';

export default function Home() {
  return (
    <main className=' flex-1 flex flex-row'>
      <div className='flex-1 relative hidden md:block after:bg-black after:opacity-50 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 overflow-hidden'>
        <video
          className='absolute top-0 left-0 w-full h-full object-cover filter blur-sm'
          autoPlay
          loop
          muted
          src='/20172811-hd_720_1280_30fps.mp4'
        />
        <h1 className='absolute top-0 left-0 m-10 lg:m-24 text-4xl font-semibold text-white'>
          Snowballed
        </h1>
      </div>
      <div className='p-10 lg:p-24 flex-1 flex flex-col'>
        <Suspense>
          <FormCompoundInterest />
        </Suspense>
      </div>
    </main>
  );
}
