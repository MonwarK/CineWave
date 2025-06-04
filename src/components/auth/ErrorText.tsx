import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ErrorText({ children }: Props) {
  return <p className="text-red-500 text-sm text-left">{children}</p>;
}
