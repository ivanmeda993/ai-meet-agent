'use client';

import { useState } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormInputProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<typeof Input>, 'name'> {
  name: FieldPath<TFieldValues>;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  suffix?: string | React.ReactNode;

  inputClassName?: string;
}

export const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  isRequired,
  type = 'text',
  placeholder,
  suffix,
  className,
  inputClassName,
  ...props
}: FormInputProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && isPasswordVisible ? 'text' : type;
  const hasSuffix = !!suffix;
  const hasPasswordToggle = isPasswordType;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className)}>
          <Label className='text-xs font-light ' htmlFor={name}>
            {label}
            {isRequired && <span className='text-destructive'>*</span>}
          </Label>
          <div className='relative'>
            <FormControl>
              <Input
                {...field}
                {...props}
                id={name}
                type={inputType}
                aria-invalid={!!fieldState.error}
                placeholder={placeholder}
                className={cn(
                  hasSuffix && !hasPasswordToggle && 'pr-12',
                  hasSuffix && hasPasswordToggle && 'pr-20',
                  inputClassName,
                )}
              />
            </FormControl>

            {/* Suffix (positioned before password toggle if both exist) */}
            {hasSuffix && (
              <div
                className={cn(
                  'absolute inset-y-0 flex items-center justify-center text-muted-foreground pointer-events-none',
                  hasPasswordToggle ? 'right-9 w-8' : 'right-1 w-8',
                )}
              >
                {typeof suffix === 'string' ? (
                  <span
                    className='text-sm'
                    dangerouslySetInnerHTML={{ __html: suffix }}
                  />
                ) : (
                  suffix
                )}
              </div>
            )}

            {/* Password toggle (always positioned at the far right) */}
            {hasPasswordToggle && (
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none'
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
              >
                {isPasswordVisible ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
