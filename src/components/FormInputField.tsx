'use client';
import React, { HTMLInputTypeAttribute } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from './ui/form';
import { Input, InputProps } from './ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../lib/utils';

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  type,
  description,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  type?: HTMLInputTypeAttribute;
  description?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormInput
          {...field}
          label={label}
          type={type}
          description={description}
        />
      )}
    />
  );
}

const FormInput = React.forwardRef(
  (
    props: InputProps & {
      label?: string;
      error?: boolean;
      description?: string;
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
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
