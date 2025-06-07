import React from "react";
import LoadingSpinner from "../loading/LoadingSpinner";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
}

export default function AuthFormButton({ children, disabled }: Props) {
  return disabled ? (
    <div className="flex justify-center w-full">
      <LoadingSpinner />
    </div>
  ) : (
    <button
      disabled={disabled}
      type="submit"
      className="w-full cursor-pointer p-2 bg-primary hover:brightness-80 transition rounded font-semibold"
    >
      {children}
    </button>
  );
}
