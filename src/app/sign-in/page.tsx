"use client";

import AuthFormButton from "@/components/auth/AuthFormButton";
import ErrorText from "@/components/auth/ErrorText";
import TextBox from "@/components/auth/TextBox";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HeightAnimationContainer from "@/components/animation/HeightAnimationContainer";
import BottomLink from "@/components/auth/BottomLink";
import BackgroundImage from "@/components/auth/BackgroundImage";

export default function page() {
  const { signIn, isLoaded } = useSignIn();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/browse");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <BackgroundImage />

      {/* Login Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        <div className="bg-black/70 p-8 rounded w-full max-w-96 py-14 space-y-4 text-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-3xl py-4 font-bold">Sign In</h2>

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

            {error && <ErrorText>{error}</ErrorText>}

            <AuthFormButton>Sign in</AuthFormButton>
          </form>

          <div>
            <p
              onClick={() => {
                setIsFormOpen(false);
                setTimeout(() => router.push("/forgot-password"), 500);
              }}
              className="font-light underline cursor-pointer hover:text-gray-300"
            >
              Forgot Password?
            </p>
          </div>

          <hr className="h-1 my-8 border-gray-500/20" />

          <div>
            <BottomLink
              question="New to CineWave?"
              link="Sign up now"
              onClick={() => {
                setIsFormOpen(false);
                setTimeout(() => router.push("/sign-up"), 500);
              }}
            />
          </div>
        </div>
      </HeightAnimationContainer>
    </div>
  );
}
