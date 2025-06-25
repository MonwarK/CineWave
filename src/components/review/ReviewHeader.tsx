import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReviewHeader({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  return (
    <div className="grid grid-cols-8 items-center">
      <div>
        <Link href={link}>
          <ChevronLeft className="hover:opacity-60 rounded-full transition duration-300 " />
        </Link>
      </div>
      <div className="text-center col-span-6">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <div />
    </div>
  );
}
