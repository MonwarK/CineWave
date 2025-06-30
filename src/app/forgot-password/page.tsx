'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackgroundImage from '@/components/auth/BackgroundImage';
import HeightAnimationContainer from '@/components/animation/HeightAnimationContainer';
import TextBox from '@/components/auth/TextBox';
import ErrorText from '@/components/auth/ErrorText';
import AuthFormButton from '@/components/auth/AuthFormButton';
import BottomLink from '@/components/auth/BottomLink';
import { useSignIn } from '@clerk/nextjs';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const sendPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setIsFormOpen(false);
        setError('');

        setTimeout(() => {
          setEmailSubmitted(true);
          setIsFormOpen(true);
        }, 1000);
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  };

  const enterCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setIsLoading(true);
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        setError(err.errors[0].longMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <BackgroundImage />

      {/* Forgot Password Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        {!emailSubmitted ? (
          <div className="bg-black/70 p-8 rounded w-full max-w-sm py-14 space-y-4 text-center">
            <form className="space-y-6" onSubmit={sendPasswordReset}>
              <h2 className="text-2xl py-4 font-bold">Forgot Password</h2>

              <TextBox
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />

              {error && <ErrorText>{error}</ErrorText>}

              <AuthFormButton disabled={isLoading}>
                Send Reset Link
              </AuthFormButton>
            </form>

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
        ) : (
          <div className="bg-black/70 p-8 rounded w-full max-w-sm py-14 space-y-4 text-center">
            <form className="space-y-6" onSubmit={enterCode}>
              <h2 className="text-2xl py-4 font-bold">Verify Password</h2>

              <TextBox
                placeholder="Enter new password"
                value={password}
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />

              <TextBox
                placeholder="Confirm password"
                value={confirmPassword}
                type="password"
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                required
              />

              <TextBox
                placeholder="Code"
                value={code}
                onChange={(e: any) => setCode(e.target.value)}
                required
                maxLength={6}
              />

              {error && <ErrorText>{error}</ErrorText>}

              <AuthFormButton disabled={isLoading}>
                Reset Password
              </AuthFormButton>
            </form>

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
        )}
      </HeightAnimationContainer>
    </div>
  );
}
