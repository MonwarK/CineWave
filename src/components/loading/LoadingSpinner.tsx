import { LoaderCircle } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div>
      <LoaderCircle className="w-10 h-10 animate-spin text-orange-400" />
    </div>
  );
}
