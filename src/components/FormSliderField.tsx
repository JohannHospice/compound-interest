'use client';
import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { SliderProps } from '@radix-ui/react-slider';

export function FormSliderField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ...props
}: SliderProps & {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  extension?: string;
}) {
  return (
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
}
const FormSlider = React.forwardRef(
  (
    props: SliderProps & {
      label?: string;
      error?: boolean;
      description?: string;
      extension?: string;
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
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
