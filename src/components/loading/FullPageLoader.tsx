import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function FullPageLoader() {
  return (
    <div className="z-30 absolute top-0 left-0 w-full h-full grid place-items-center">
      <LoadingSpinner />
    </div>
  );
}
