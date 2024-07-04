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
          label="Quelle année commencer l'investissement ?"
          type='number'
        />
        <FormInputField
          control={form.control}
          name='age'
          label='Quel âge avez-vous ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='until_age'
          label='À quel âge souhaitez-vous partir à la retraite ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='principal'
          label='Quel sera votre apport initial ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='compound'
          label='Combien souhaitez-vous investir chaque mois ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='interestRate'
          label='Quel sera le taux d’intérêt sur vos investissements ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='taxRate'
          label="Quel est le taux d'imposition sur les plus-values à appliquer ?"
          description='En France, le taux d’imposition sur les plus-values est de 30% lors de la vente de vos actifs.'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='targetPrincipal'
          label='Quel valeur souhaitez-vous que votre capital atteigne ?'
          type='number'
        />
        <FormInputField
          control={form.control}
          name='targetInterest'
          label='Quel valeur souhaitez-vous que vos intérêts atteignent ?'
          type='number'
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          Calculer
        </Button>
      </form>
    </Form>
  );
}
