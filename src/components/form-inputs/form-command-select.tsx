'use client';

import { type ReactNode } from 'react';
import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';

import { CommandSelect } from '@/components/command-select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormCommandSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  description?: string | ReactNode;
  className?: string;
  selectClassName?: string;
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
}

export const FormCommandSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  isRequired,
  placeholder,
  description,
  className,
  selectClassName,
  options,
  onSearch,
  onSelect,
}: FormCommandSelectProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className)}>
          <Label className='text-xs font-light' htmlFor={name}>
            {label}
            {isRequired && <span className='text-destructive'>*</span>}
          </Label>
          <FormControl>
            <CommandSelect
              options={options}
              onSelect={(value) => {
                field.onChange(value);
                onSelect?.(value);
              }}
              onSearch={onSearch}
              value={field.value}
              placeholder={placeholder}
              className={cn(
                fieldState.error && 'border-destructive',
                selectClassName,
              )}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};