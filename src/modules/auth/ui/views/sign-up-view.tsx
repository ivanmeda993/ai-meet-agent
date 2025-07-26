'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { FormInput } from '@/components/form-inputs/form-input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';

import { signUpSchema, type SignUpSchemaInputs } from '../../auth-schema';

export const SignUpView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpSchemaInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpSchemaInputs) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: ({ error }) => {
          setError(error.message);
        },
        onResponse: () => {
          setPending(false);
        },
      },
    );
  };
  const onSocial = (provider: 'github' | 'google') => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: '/',
      },
      {
        onError: ({ error }) => {
          setError(error.message);
        },
        onResponse: () => {
          setPending(false);
        },
      },
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Let&apos;s get started</h1>
                  <p className='text-muted-foreground text-balance'>
                    Create your account
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormInput<SignUpSchemaInputs>
                    name='name'
                    label='Name'
                    isRequired
                    placeholder='Enter your name'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormInput<SignUpSchemaInputs>
                    name='email'
                    label='Email'
                    isRequired
                    placeholder='Enter your email'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormInput<SignUpSchemaInputs>
                    name='password'
                    label='Password'
                    isRequired
                    type='password'
                    placeholder='Enter your password'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormInput<SignUpSchemaInputs>
                    name='confirmPassword'
                    label='Confirm Password'
                    isRequired
                    type='password'
                    placeholder='Confirm your password'
                  />
                </div>
                {!!error && (
                  <Alert className='bg-destructive/10 border-none'>
                    <OctagonAlertIcon className='h-4 w-4 !text-destructive' />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type='submit' className='w-full'>
                  Sign Up
                </Button>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or Continue with
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Button
                    disabled={pending}
                    onClick={() => onSocial('google')}
                    variant='outline'
                    type='button'
                    className='w-full'
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() => onSocial('github')}
                    variant='outline'
                    type='button'
                    className='w-full'
                  >
                    <FaGithub />
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Already have an account?{' '}
                  <Link
                    href='/sign-in'
                    className='underline underline-offset-4'
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className='bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center'>
            <Image
              src='/logo.svg'
              alt='Image'
              className='h-[92px] w-[92px]'
              width={92}
              height={92}
            />
            <p className='text-2xl font-semibold text-[#212326]'>Meet.AI!</p>
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>
      </div>
    </div>
  );
};
