'use client';
import { toQueryString } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputField } from './FormInputField';
import { FormSliderField } from './FormSliderField';
import { Stepper, StepperFooter, StepperHeading, useStepper } from './Stepper';
import { Form } from './ui/form';
import {
  HandCoins,
  TargetIcon,
  TreesIcon,
  User,
  UserCircle,
} from 'lucide-react';

const stepOneSchema = yup.object().shape({
  from: yup
    .number()
    .nonNullable()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  age: yup.number().nonNullable().min(7).max(120).required(),
  until_age: yup.number().max(120).required(),
});
export const step2schema = yup.object().shape({
  principal: yup.number().min(0).required(),
  compound: yup.number().nonNullable().min(0).required(),
});

export const step3schema = yup.object().shape({
  targetPrincipal: yup.number().min(0),
  targetInterest: yup.number().min(0),
});
export const step4schema = yup.object().shape({
  interestRate: yup.number().nonNullable().min(0).max(100).required(),
  taxRate: yup.number().nonNullable().min(0).max(100).required(),
});
const maxiSchema = stepOneSchema
  .concat(step2schema)
  .concat(step3schema)
  .concat(step4schema);

export function FormCompoundInterest() {
  const params = useSearchParams();
  const router = useRouter();

  const storedValues = useMemo<
    Partial<yup.InferType<typeof maxiSchema>>
  >(() => {
    const configFromParams: Record<string, any> = {};
    params.forEach((value, key) => (configFromParams[key] = value));
    return configFromParams;
  }, [params]);

  const onSubmit = useCallback(
    (values: Partial<yup.InferType<typeof maxiSchema>>) => {
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
    (values: Partial<yup.InferType<typeof maxiSchema>>) => {
      router.push('?' + toQueryString({ ...storedValues, ...values }));
    },
    [router, storedValues]
  );

  return (
    <Stepper>
      <ProfileForm values={storedValues} onSubmit={updateData} />
      <InvestingCapacityStepForm values={storedValues} onSubmit={updateData} />
      <TargetStepForm values={storedValues} onSubmit={updateData} />
      <FinancialStepForm values={storedValues} onSubmit={onSubmit} />
    </Stepper>
  );
}

function ProfileForm({
  onSubmit,
  values,
}: {
  onSubmit: (data: yup.InferType<typeof stepOneSchema>) => void;
  values?: Partial<yup.InferType<typeof stepOneSchema>>;
}) {
  const form = useForm({
    resolver: yupResolver(stepOneSchema),
    defaultValues: {
      from: new Date().getFullYear(),
      until_age: 42,
    },
  });
  const { next } = useStepper();

  useEffect(() => {
    form.reset({
      ...values,
      until_age:
        values?.until_age && values?.age
          ? values?.until_age - values?.age
          : undefined,
    });
  }, [values, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit({ ...data, until_age: data.until_age + data.age });
          next();
        })}
        className='flex flex-1 flex-col justify-between'
      >
        <div className='space-y-8 flex flex-col'>
          <StepperHeading icon={UserCircle} title="Votre profil d'investisseur">
            Pour déterminer la meilleure stratégie d’investissement pour vous,
            nous avons besoin de quelques informations sur votre situation
            actuelle.
          </StepperHeading>
          <FormInputField
            control={form.control}
            name='from'
            label="Quelle année commencer l'investissement ? *"
            type='number'
          />
          <FormInputField
            control={form.control}
            name='age'
            label='Quel âge avez-vous ? *'
            type='number'
          />
          <FormSliderField
            control={form.control}
            name='until_age'
            label='Dans combien d’années souhaitez-vous arrêter de travailler ? *'
            extension=' ans'
            min={0}
            max={60}
          />
        </div>
        <StepperFooter isNextDisabled={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}

function InvestingCapacityStepForm({
  onSubmit,
  values,
}: {
  onSubmit: (data: yup.InferType<typeof step2schema>) => void;
  values?: Partial<yup.InferType<typeof step2schema>>;
}) {
  const form = useForm({
    resolver: yupResolver(step2schema),
    defaultValues: {},
  });
  const { next } = useStepper();
  useEffect(() => {
    form.reset(values);
  }, [values, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
          next();
        })}
        className='flex flex-1 flex-col justify-between'
      >
        <div className='space-y-8 flex flex-col'>
          <StepperHeading icon={HandCoins} title="Votre capacité d'épargne">
            Pour déterminer votre capacité d&apos;épargne, nous avons besoin de
            quelques informations supplémentaires.
          </StepperHeading>
          <FormInputField
            control={form.control}
            name='principal'
            label='Quel est le montant de votre apport initial ? *'
            description='Plus votre capital de départ est gros et vous serez en avance sur vos objectifs.'
            type='number'
          />
          <FormInputField
            control={form.control}
            name='compound'
            label='Combien souhaitez-vous investir chaque mois ? *'
            description='Les dépenses mensuelles sont à prendre en compte pour déterminer le montant que vous pouvez investir.'
            type='number'
          />
        </div>
        <StepperFooter isNextDisabled={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}

function TargetStepForm({
  onSubmit,
  values,
}: {
  onSubmit: (data: yup.InferType<typeof step3schema>) => void;
  values?: Partial<yup.InferType<typeof step3schema>>;
}) {
  const form = useForm({
    resolver: yupResolver(step3schema),
  });
  const { next } = useStepper();
  useEffect(() => {
    form.reset(values);
  }, [values, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
          next();
        })}
        className='flex flex-1 flex-col justify-between'
      >
        <div className='space-y-8 flex flex-col'>
          <StepperHeading icon={TargetIcon} title='Vos objectifs financiers'>
            Pour déterminer la meilleure stratégie d’investissement pour vous,
            nous avons besoin de quelques informations sur vos objectifs
            financiers.
          </StepperHeading>
          <FormInputField
            control={form.control}
            name='targetPrincipal'
            label='Quel valeur souhaitez-vous que votre capital atteigne ?'
            type='number'
          />
          <FormInputField
            control={form.control}
            name='targetInterest'
            label="Combien d'interets souhaitez-vous gagner chaque année ?"
            description='Une rente construite soi même pour vos vieux jours est tout à fait envisageable.'
            type='number'
          />
        </div>
        <StepperFooter
          isNextDisabled={form.formState.isSubmitting}
          isSkippable
        />
      </form>
    </Form>
  );
}

function FinancialStepForm({
  onSubmit,
  values,
}: {
  onSubmit: (data: yup.InferType<typeof step4schema>) => void;
  values?: Partial<yup.InferType<typeof step4schema>>;
}) {
  const form = useForm({
    resolver: yupResolver(step4schema),
    defaultValues: {
      interestRate: 8,
      taxRate: 30,
    },
  });
  useEffect(() => {
    form.reset(values);
  }, [values, form]);
  const { next } = useStepper();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
          next();
        })}
        className='flex flex-1 flex-col justify-between'
      >
        <div className='space-y-8 flex flex-col'>
          <StepperHeading icon={TreesIcon} title="L'environnement financier">
            Lors de vos investissements, plusieurs paramètres financiers sont à
            prendre en compte pour déterminer la meilleure stratégie
            d’investissement pour vous.
          </StepperHeading>
          <FormSliderField
            control={form.control}
            name='interestRate'
            label='Quel sera le taux d’intérêt sur vos investissements ? *'
            description='Sur le marché des actions, on peut espérer un rendement annuel moyen de 8%.'
            extension='%'
            min={0}
            max={100}
          />
          <FormSliderField
            control={form.control}
            name='taxRate'
            label="Quel est le taux d'imposition sur les plus-values à appliquer ? *"
            description='En France, le taux d’imposition sur les plus-values est de 30% lors de la vente de vos actifs.'
            extension='%'
            min={0}
            max={100}
          />
        </div>
        <StepperFooter isNextDisabled={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
