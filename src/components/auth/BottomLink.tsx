import React from "react";

interface Props {
  question: string;
  link: string;
  onClick: () => void;
}

export default function BottomLink({ question, link, onClick }: Props) {
  return (
    <p className="text-gray-400">
      {question}{" "}
      <span
        onClick={onClick}
        className=" cursor-pointer text-white hover:underline hover:text-gray-100"
      >
        {link}
      </span>
    </p>
  );
}
