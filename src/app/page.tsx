'use client';

import { useState } from 'react';

import { authClient } from '@/lib/auth-client';
export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: _data, error: _error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onRequest: (ctx) => {
          console.log('Request -> ', ctx);
          //show loading
        },
        onSuccess: (ctx) => {
          console.log('Success -> ', ctx);
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          console.log('Error -> ', ctx);

          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>
          Sign Up
        </button>
      </form>
    </div>
  );
}
