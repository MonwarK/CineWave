import { HandHelping } from "lucide-react";
import React from "react";

export default function SearchIcon() {
  return (
    <div className="flex items-center space-x-2 transition duration-1000 hover:-translate-x-15 hover:scale-200">
      <HandHelping className="text-[#6b2e19]" size={24} />
      <span>
        <p className="text-[#6b2e19]">Brokie Plan</p>
        <p className="text-[#6b2e19] text-[9.25px] text-right">
          Don't be a beggar
        </p>
      </span>
    </div>
  );
}
