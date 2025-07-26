'use client';

import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormTextareaProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<typeof Textarea>, 'name'> {
  name: FieldPath<TFieldValues>;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  suffix?: string | React.ReactNode;
  textareaClassName?: string;
  /**
   * Number of visible text lines for the control
   */
  rows?: number;
  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;
  /**
   * Whether to show character count
   */
  showCharCount?: boolean;
}

export const FormTextarea = <TFieldValues extends FieldValues>({
  name,
  label,
  isRequired,
  placeholder,
  suffix,
  className,
  textareaClassName,
  rows = 3,
  maxLength,
  showCharCount = false,
  ...props
}: FormTextareaProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  const hasSuffix = !!suffix;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const currentLength = field.value?.length || 0;
        const isOverLimit = maxLength ? currentLength > maxLength : false;

        return (
          <FormItem className={cn(className)}>
            <Label className='text-xs font-light' htmlFor={name}>
              {label}
              {isRequired && <span className='text-destructive'>*</span>}
            </Label>
            <div className='relative'>
              <FormControl>
                <Textarea
                  {...field}
                  {...props}
                  id={name}
                  rows={rows}
                  maxLength={maxLength}
                  aria-invalid={!!fieldState.error}
                  placeholder={placeholder}
                  className={cn(
                    hasSuffix && 'pr-12',
                    showCharCount && 'pb-6',
                    textareaClassName,
                  )}
                />
              </FormControl>

              {/* Suffix */}
              {hasSuffix && (
                <div className='absolute top-3 right-3 flex items-center justify-center text-muted-foreground pointer-events-none'>
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

              {/* Character count */}
              {showCharCount && (
                <div
                  className={cn(
                    'absolute bottom-2 right-3 text-xs text-muted-foreground',
                    isOverLimit && 'text-destructive',
                  )}
                >
                  {currentLength}
                  {maxLength && `/${maxLength}`}
                </div>
              )}
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
