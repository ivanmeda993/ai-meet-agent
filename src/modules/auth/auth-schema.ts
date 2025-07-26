import z from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().optional(),
});

export type SignInSchemaInputs = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email(),
    password: z.string().min(1, { message: 'Password required' }),
    confirmPassword: z.string().min(1, { message: 'Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpSchemaInputs = z.infer<typeof signUpSchema>;
