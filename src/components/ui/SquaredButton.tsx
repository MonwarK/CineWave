import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
}

type Variants = "primary" | "secondary" | "info";

const buttonVariantClasses: Record<Variants, string> = {
  primary:
    "bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2 cursor-pointer",
  secondary:
    "hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2 inline-flex items-center  font-semibold",
  info: "p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition",
};

export default function SquaredButton({
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={clsx(buttonVariantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
