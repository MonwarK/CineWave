import React from "react";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
}

export default function AuthFormButton({ children, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full cursor-pointer p-2 bg-primary hover:brightness-80 transition rounded font-semibold"
    >
      {children}
    </button>
  );
}
