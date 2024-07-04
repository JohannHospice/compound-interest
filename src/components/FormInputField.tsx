'use client';
import React, { HTMLInputTypeAttribute } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input, InputProps } from './ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  type,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => <FormInput {...field} label={label} type={type} />}
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
    return (
      <FormItem>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <FormControl>
          <Input {...props} ref={ref} />
        </FormControl>
        <FormDescription>{props.description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);
FormInput.displayName = 'InputWithLabel';
