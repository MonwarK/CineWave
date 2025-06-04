"use client";

import AuthFormButton from "@/components/auth/AuthFormButton";
import ErrorText from "@/components/auth/ErrorText";
import TextBox from "@/components/auth/TextBox";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { closeHeight, openHeight } from "@/motion/variants/height";
import HeightAnimationContainer from "@/components/animation/HeightAnimationContainer";
import BottomLink from "@/components/auth/BottomLink";

export default function page() {
  const { signUp, setActive, isLoaded } = useSignUp();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/verify-email");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="top-0 left-0 fixed -z-50 w-full h-full">
        <img
          className="w-full h-full object-cover brightness-50 blur-[4px]"
          src="https://media.discordapp.net/attachments/655822636277825588/1379578672498868274/ChatGPT_Image_Jun_3_2025_10_35_36_PM.png?ex=6840c042&is=683f6ec2&hm=cdfc2ac986eb5284ead90c11b9a0d4377bd1e2dd07322b54830920f8616e7a7e&=&format=webp&quality=lossless&width=916&height=611"
          alt="Background"
        />
      </div>

      {/* Logo */}
      <div className="absolute z-50 top-5 left-5 right-5 max-w-screen-xl mx-auto w-full">
        <img
          className="h-16 object-fit cursor-pointer hover:animate-pulse"
          src="https://media.discordapp.net/attachments/655822636277825588/1379584370620370945/image-removebg-preview_16.png?ex=6840c591&is=683f7411&hm=df888960b39c65f0f138910690bf88baa7711bd08b68f96a954397ab5d79cf48&=&format=webp&quality=lossless&width=491&height=301"
          alt="Logo"
        />
      </div>

      {/* Sign Up Container */}
      <HeightAnimationContainer isFormOpen={isFormOpen}>
        <div className="bg-black/70 p-8 rounded w-96 py-14 space-y-4 text-center">
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
              value={password}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <ErrorText>{error}</ErrorText>}

            <AuthFormButton>Register</AuthFormButton>
          </form>

          <hr className="h-1 my-8 border-gray-500/20" />

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
