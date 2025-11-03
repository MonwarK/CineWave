import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
}

type Variants = 'primary' | 'secondary' | 'white' | 'info';

const buttonVariantClasses: Record<Variants, string> = {
  primary:
    'bg-[#d36013] hover:opacity-80 text-white px-6 py-2 rounded-md transition flex justify-center items-center cursor-pointer uppercase space-x-2 font-semibold border-2 border-[#d36013] duration-300 shadow-sm',
  secondary:
    'bg-black/30 hover:bg-white hover:text-gray-800 text-white px-6 py-2 rounded-md transition duration-300 flex justify-center items-center cursor-pointer uppercase space-x-2 border-2 border-white font-semibold',
  white:
    'bg-white hover:opacity-80 text-black px-6 py-2 rounded-md transition flex items-center cursor-pointer uppercase space-x-2 font-semibold border-2 border-white duration-300',
  info: 'p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition',
};

export default function SquaredButton({
  children,
  className,
  variant = 'primary',
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
