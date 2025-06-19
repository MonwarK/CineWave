import clsx from "clsx";

interface Props{
    children: React.ReactNode;
    className: string;
    onClick?: () => void;
    variant?: Variants;
    size?: Sizes
}

type Sizes = "sm" | "md" | "lg" | "icon";
type Variants = "primary" | "secondary" | "tertiary"

const buttonSizeClasses: Record<Sizes, string> = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6",
    icon: "p-2"
  };


  const buttonVariantClasses: Record<Variants, string> = {
    primary: "bg-orange-500 hover:opacity-80 transition text-white cursor-pointer px-4 py-2 rounded-full uppercase font-bold flex items-center space-x-1",
    secondary: "bg-gray-800/20 hover:opacity-85 cursor-pointer backdrop-blur-2xl py-2 px-4 tracking-wider font-medium rounded-full transition uppercase flex items-center space-x-2",
    tertiary: "p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition",
  };

export default function Button({ children, className, onClick, size = "sm", variant = "primary" }: Props) {

    return (
        <button className={clsx(buttonSizeClasses[size], buttonVariantClasses[variant], className)} onClick={onClick}>
            {children}
        </button>
    );
}


