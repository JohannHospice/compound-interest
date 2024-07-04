'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { FormInputField } from './FormInputField';
import { toQueryString } from '@/lib/utils';
import { schemaConfig } from '../validators/schema';
import { CompoundInterestConfig } from '../validators/schema';

export function FormCompoundInterest() {
  const form = useForm<CompoundInterestConfig>({
    resolver: yupResolver(schemaConfig),
    defaultValues: {
      from: new Date().getFullYear(),
      until_age: 64,
      principal: 0,
      interestRate: 8,
      taxRate: 30,
    },
  });
  const router = useRouter();

  const onSubmit = useCallback(
    (data: CompoundInterestConfig) => {
      router.push(`/strategy?${toQueryString(data)}`);
    },
    [router]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormInputField
          control={form.control}
          name='from'
          label='Date de début'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='age'
          label='Age'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='until_age'
          label='Age cible'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='principal'
          label='Capital initial'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='compound'
          label='Investissement mensuel'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='interestRate'
          label='Taux de rendement'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='taxRate'
          label='Taux d’imposition'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='targetPrincipal'
          label='Capital cible'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='targetInterest'
          label='Intérêts cibles'
          type='number'
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          Calculer
        </Button>
      </form>
    </Form>
  );
}
