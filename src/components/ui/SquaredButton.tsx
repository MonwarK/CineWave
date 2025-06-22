import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
}

type Variants = "primary" | "secondary" | "info";

const buttonVariantClasses: Record<Variants, string> = {
  primary:
    "bg-white hover:opacity-95 text-black px-6 py-2 rounded-md transition-colors flex items-center cursor-pointer uppercase space-x-2 font-semibold border-2 border-white",
  secondary:
    "bg-black/30 hover:bg-white hover:text-gray-800 text-white px-6 py-2 rounded-md transition duration-300 flex items-center cursor-pointer uppercase space-x-2 border-2 border-white font-semibold",
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
