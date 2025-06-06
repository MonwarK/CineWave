"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundImage from "@/components/auth/BackgroundImage";
import HeightAnimationContainer from "@/components/animation/HeightAnimationContainer";
import TextBox from "@/components/auth/TextBox";
import ErrorText from "@/components/auth/ErrorText";
import AuthFormButton from "@/components/auth/AuthFormButton";
import BottomLink from "@/components/auth/BottomLink";
import { useSignUp } from "@clerk/nextjs";

export default function ForgotPasswordPage() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const { signUp, isLoaded, setActive } = useSignUp();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      setIsLoading(true);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/discover");
      } else {
        setError("Verification incomplete. Please try again.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <BackgroundImage />

      {/* Forgot Password Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        <div className="bg-black/70 p-8 rounded w-full max-w-xl py-14 space-y-4 text-center">
          <form className="space-y-6" onSubmit={handleVerify}>
            <h2 className="text-2xl py-4 font-bold">Verify Email</h2>

            <TextBox
              placeholder="Code"
              value={code}
              onChange={(e: any) => setCode(e.target.value)}
              required
            />

            {error && <ErrorText>{error}</ErrorText>}

            <AuthFormButton disabled={isLoading}>Verify</AuthFormButton>
          </form>
        </div>
      </HeightAnimationContainer>
    </div>
  );
}
