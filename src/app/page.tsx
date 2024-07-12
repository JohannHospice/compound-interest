import { Suspense } from 'react';
import { CompoundInterestStepper } from '../components/forms/form-stepper';

export default function Home() {
  return (
    <main className='flex-1 flex flex-row'>
      <div className='flex-1 relative hidden md:block overflow-hidden'>
        <video
          className='absolute top-0 left-0 w-full h-full object-cover filter blur-sm'
          autoPlay
          loop
          muted
          src='/20172811-hd_720_1280_30fps.mp4'
        />
        <div className='bg-black opacity-50 absolute inset-0'></div>
        <div className='absolute top-0 left-0 m-10 lg:m-24'>
          <h1 className='text-4xl font-semibold text-white'>SnowballR</h1>
          <h2 className='text-2xl text-gray-200 mt-4'>
            Découvrez comment votre épargne peut vous rapporter plus que vous ne
            le pensez.
          </h2>
        </div>

        <div className='absolute bottom-0 left-0 m-10 lg:m-24'>
          <p className='text-gray-200 italic mt-10 '>
            Ne cherchez pas à devenir riche du jour au lendemain. Cherchez
            plutôt à devenir investisseur du jour au lendemain.
          </p>
          <p className='text-gray-200 mt-4'>- Warren Buffet</p>
        </div>
      </div>
      <div className='p-4 sm:p-10 lg:p-24 flex-1 flex flex-col'>
        <Suspense>
          <CompoundInterestStepper />
        </Suspense>
      </div>
    </main>
  );
}
