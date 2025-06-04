import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthFormButton({ children }: Props) {
  return (
    <button
      type="submit"
      className="w-full cursor-pointer p-2 bg-orange-500 hover:bg-orange-600 transition rounded font-semibold"
    >
      {children}
    </button>
  );
}
