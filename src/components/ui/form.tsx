import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input, InputProps } from '@/components/ui/input';
import { SliderProps } from '@radix-ui/react-slider';
import { Slider } from './slider';
import { Switch } from './switch';
import { SwitchProps } from '@radix-ui/react-switch';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, 'control' | 'name'> &
  FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => <FormInput {...field} {...props} />}
  />
);

type FormInputProps = InputProps & {
  label?: string;
  description?: string;
};
const FormInput = React.forwardRef(
  (props: FormInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { error } = useFormField();
    return (
      <FormItem>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <FormControl>
          <Input
            {...props}
            ref={ref}
            className={cn(error ? 'border-red-500' : undefined)}
          />
        </FormControl>
        <FormDescription>{props.description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);
FormInput.displayName = 'FormInput';

const FormSliderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, 'control' | 'name'> &
  FormSliderProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field: { onChange, value, ...field } }) => (
      <FormSlider
        {...field}
        value={[value === undefined ? 0 : value]}
        onValueChange={([value]) => {
          onChange(value);
        }}
        {...props}
      />
    )}
  />
);

type FormSliderProps = SliderProps & {
  label?: string;
  error?: boolean;
  description?: string;
  extension?: string;
};
const FormSlider = React.forwardRef(
  (props: FormSliderProps, ref: React.Ref<HTMLInputElement>) => {
    const value = props.value?.length === 1 ? props.value[0] : 0;
    return (
      <FormItem>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <div className='flex flex-col gap-2 pt-4'>
          <FormControl>
            <Slider {...props} ref={ref} />
          </FormControl>
          <div className=''>
            {String(value)}
            {props.extension}
          </div>
        </div>
        <FormDescription>{props.description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);
FormSlider.displayName = 'FormInput';

type FormSwitchProps = SwitchProps & {
  label?: string;
};
const FormSwitch = React.forwardRef(
  (props: FormSwitchProps, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <div className='flex gap-2 items-center'>
        <Switch {...props} ref={ref} />
        <Label htmlFor={props.id}>{props.label}</Label>
      </div>
    );
  }
);
FormSwitch.displayName = 'FormSwitch';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormInput,
  FormInputField,
  FormSliderField,
  FormSlider,
  FormSwitch,
};
