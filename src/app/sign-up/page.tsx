'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import BackgroundImage from '@/components/auth/BackgroundImage';
import HeightAnimationContainer from '@/components/animation/HeightAnimationContainer';
import TextBox from '@/components/auth/TextBox';
import ErrorText from '@/components/auth/ErrorText';
import AuthFormButton from '@/components/auth/AuthFormButton';
import BottomLink from '@/components/auth/BottomLink';

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();
  const params = useSearchParams();

  console.log(params);

  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(params.get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isLoading) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      router.push('/verify-email');
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Sign-up failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <BackgroundImage />

      {/* Sign Up Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        <div className="bg-black/70 p-8 rounded w-full max-w-96 py-14 space-y-4 text-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-3xl py-4 font-bold">Sign Up</h2>
            <TextBox
              placeholder="First Name"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              required
            />
            <TextBox
              placeholder="Last Name"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              required
            />
            <TextBox
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
            <TextBox
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
            <TextBox
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <ErrorText>{error}</ErrorText>}

            <AuthFormButton disabled={isLoading}>Register</AuthFormButton>
          </form>

          <div id="clerk-captcha" />

          <hr className="h-1 my-8 border-gray-500/20" />

          <div>
            <BottomLink
              question="Have an account?"
              link="Sign in here"
              onClick={() => {
                setIsFormOpen(false);
                setTimeout(() => router.push('/sign-in'), 500);
              }}
            />
          </div>
        </div>
      </HeightAnimationContainer>
    </div>
  );
}
