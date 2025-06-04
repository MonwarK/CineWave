import BackgroundImage from "@/components/auth/BackgroundImage";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <BackgroundImage />

      <div>
        <p className="text-3xl font-bold tracking-wider">
          {"404 - Page Not Found :("}
        </p>
      </div>
    </div>
  );
}
