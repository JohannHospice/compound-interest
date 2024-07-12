'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Euro,
  HandCoins,
  TargetIcon,
  TreesIcon,
  UserCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StepperFooter, StepperHeading, useStepper } from '../stepper';
import { Form, FormInputField, FormSliderField } from '../ui/form';
import {
  investmentSchema,
  performanceSchema,
  profileSchema,
  targetSchema,
} from '@/validators';

type FormProps<T extends yup.ISchema<any, any>> = {
  onSubmit: (data: yup.InferType<T>) => void;
  values?: Partial<yup.InferType<T>>;
};

function ProfileForm({ onSubmit, values }: FormProps<typeof profileSchema>) {
  const form = useForm({
    resolver: yupResolver(profileSchema),
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
            Avec votre profil, nous pourrons calculer selon différents échelles
            de temps les revenus de vos investissements.
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
            endAdornment='ans'
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

function InvestmentForm({
  onSubmit,
  values,
}: FormProps<typeof investmentSchema>) {
  const form = useForm({
    resolver: yupResolver(investmentSchema),
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
            endAdornment={Euro}
          />
          <FormInputField
            control={form.control}
            name='compound'
            label='Combien souhaitez-vous investir chaque mois ? *'
            description='Les dépenses mensuelles sont à prendre en compte pour déterminer le montant que vous pouvez investir.'
            type='number'
            endAdornment={Euro}
          />
        </div>
        <StepperFooter isNextDisabled={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}

function TargetForm({ onSubmit, values }: FormProps<typeof targetSchema>) {
  const form = useForm({
    resolver: yupResolver(targetSchema),
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
            Des objectifs clair et précis vous permettront de mieux comprendre
            les enjeux
          </StepperHeading>
          <FormInputField
            control={form.control}
            name='targetPrincipal'
            label='Quel valeur souhaitez-vous que votre capital atteigne ?'
            type='number'
            endAdornment={Euro}
          />
          <FormInputField
            control={form.control}
            name='targetInterest'
            label="Combien d'interets souhaitez-vous gagner chaque année ?"
            description='Une rente construite soi même pour vos vieux jours est tout à fait envisageable.'
            type='number'
            endAdornment={Euro}
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
}: FormProps<typeof performanceSchema>) {
  const form = useForm({
    resolver: yupResolver(performanceSchema),
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

export { FinancialStepForm, InvestmentForm, ProfileForm, TargetForm };
