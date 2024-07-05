'use client';
import { ArrowLeft } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Button } from './ui/button';

export const StepperContext = React.createContext({
  index: 0,
  length: 0,
  next: () => {},
  previous: () => {},
});

export function Stepper({ children }: { children: React.ReactNode[] }) {
  const [currentStep, setCurrentStep] = useState(0);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev === 0 ? 0 : prev - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < children.length - 1 ? prev + 1 : prev));
  }, [children]);

  return (
    <StepperContext.Provider
      value={{
        index: currentStep,
        length: children.length,
        next: nextStep,
        previous: previousStep,
      }}
    >
      {children.length === 0 ? null : children[currentStep]}
    </StepperContext.Provider>
  );
}

export function useStepper() {
  return React.useContext(StepperContext);
}

export function StepperFooter({
  onNext,
  isNextDisabled,
  isSkippable,
}: {
  onNext?: () => void;
  isSkippable?: boolean;
  isNextDisabled?: boolean;
}) {
  const { index, length, next, previous } = useStepper();
  return (
    <div className='flex justify-between gap-4'>
      {index > 0 ? (
        <Button variant='ghost' onClick={previous}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Retour à l&apos;étape précédente
        </Button>
      ) : (
        <div />
      )}
      <div className='flex gap-4'>
        {isSkippable && (
          <Button variant='outline' onClick={next}>
            Passer
          </Button>
        )}
        <Button type='submit' disabled={isNextDisabled}>
          {index === length - 1 ? 'Envoyer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}

export function StepperHeading({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className='space-y-4 flex flex-col'>
      <h2 className='text-2xl font-bold flex items-center'>
        <Icon className='h-8 w-8 inline-block mr-2' />
        {title}
      </h2>
      <p className='text-lg text-gray-600'>{children}</p>
    </div>
  );
}
