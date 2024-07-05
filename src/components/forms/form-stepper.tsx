'use client';
import { toQueryString } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { StepperProvider } from '../stepper';
import {
  FinancialStepForm,
  InvestmentForm,
  ProfileForm,
  TargetForm,
} from './forms';
import { StrategyModel } from '../../models/strategy';

export function CompoundInterestStepper() {
  const params = useSearchParams();
  const router = useRouter();

  const storedValues = useMemo<Partial<StrategyModel>>(() => {
    const configFromParams: Record<string, any> = {};
    params.forEach((value, key) => (configFromParams[key] = value));
    return configFromParams;
  }, [params]);

  const onSubmit = useCallback(
    (values: Partial<StrategyModel>) => {
      router.push(
        `/strategy?${toQueryString({
          ...storedValues,
          ...values,
        })}`
      );
    },
    [router, storedValues]
  );

  const updateData = useCallback(
    (values: Partial<StrategyModel>) => {
      router.push('?' + toQueryString({ ...storedValues, ...values }));
    },
    [router, storedValues]
  );

  return (
    <StepperProvider>
      <ProfileForm values={storedValues} onSubmit={updateData} />
      <InvestmentForm values={storedValues} onSubmit={updateData} />
      <TargetForm values={storedValues} onSubmit={updateData} />
      <FinancialStepForm values={storedValues} onSubmit={onSubmit} />
    </StepperProvider>
  );
}
