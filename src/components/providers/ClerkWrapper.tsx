"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#d86020",
          colorText: "#ffffff",
          colorNeutral: "#fff",
          colorShimmer: "#fff",
          colorBackground: "#101011",
          borderRadius: "8px",
          fontSize: "1rem",
        },
        elements: {
          drawerRoot: "z-50 bg-black/80",
          drawerBody: "bg-zinc-900",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
