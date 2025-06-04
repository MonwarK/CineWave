"use client";

import HeightAnimationContainer from "@/components/animation/HeightAnimationContainer";
import AuthFormButton from "@/components/auth/AuthFormButton";
import BackgroundImage from "@/components/auth/BackgroundImage";
import BottomLink from "@/components/auth/BottomLink";
import ErrorText from "@/components/auth/ErrorText";
import TextBox from "@/components/auth/TextBox";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = () => null;

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <BackgroundImage />

      {/* Forgot Password Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        <div className="bg-black/70 p-8 rounded w-full max-w-xl py-14 space-y-4 text-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl py-4 font-bold">Forgot Password</h2>

            <TextBox
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />

            {error && <ErrorText>{error}</ErrorText>}

            <AuthFormButton>Send Reset Link</AuthFormButton>
          </form>

          <div>
            <BottomLink
              question="Have an account?"
              link="Sign in here"
              onClick={() => {
                setIsFormOpen(false);
                setTimeout(() => router.push("/sign-in"), 500);
              }}
            />
          </div>
        </div>
      </HeightAnimationContainer>
    </div>
  );
}
