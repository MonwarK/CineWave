import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ClerkWrapper from "@/components/providers/ClerkWrapper"; // adjust path if needed

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CineWave",
  description: "Your new streaming home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClerkWrapper>{children}</ClerkWrapper>
      </body>
    </html>
  );
}
